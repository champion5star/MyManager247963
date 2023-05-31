import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import React, { useState, useEffect, useCallback, useContext, useRef, Fragment } from 'react';
import { Copy, Minus, Plus, Trash } from 'react-feather';
import { FaRedo, FaUndo } from 'react-icons/fa';
import {
  Button,
  Col,
  Row,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledButtonDropdown
} from 'reactstrap';
import ApproveBoard from './drags/approve/ApproveBoard';
import { DocumentContext } from '../../../utility/context/Document';
import PropertiesMenu from './drags/PropertiesMenu';
import AttachmentBoard from './drags/attachment/AttachmentBoard';
import SignBoard from './drags/sign/SignBoard';
import InitialBoard from './drags/initial/InitialBoard';
import StampBoard from './drags/stamp/StampBoard';
import SignDateBoard from './drags/signDate/SignDateBoard';
import NameBoard from './drags/name/NameBoard';
import EmailBoard from './drags/email/EmailBoard';
import CompanyBoard from './drags/company/CompanyBoard';
import TitleBoard from './drags/title/TitleBoard';
import CheckboxBoard from './drags/checkbox/CheckboxBoard';
import TextBoard from './drags/text/TextBoard';
import DropdownBoard from './drags/dropdown/DropdownBoard';
import DrawingBoard from './drags/drawing/DrawingBoard';
import FormulaBoard from './drags/formula/FormulaBoard';
import NoteBoard from './drags/note/NoteBoard';
import DeclineBoard from './drags/decline/DeclineBoard';
import RadioBoard from './drags/radio/RadioBoard';
import LineBoard from './drags/line/LineBoard';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

//import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
export default function TestPdfViewer() {
  // ** States
  //const [zoomOpen, setzoomOpen] = useState(false);
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();

  const [indexUndoRedo, setIndexUndoRedo] = useState(1);
  const [isChanged, setIsChanged] = useState(false);
  //const [zoom, setZoom] = useState(5);
  const [dropWidth, setDropWidth] = useState('100%');
  const [dropHeight, setDropHeight] = useState('100%');
  const [itemProps, setItemProps] = useState({});
  const [boardCurrent, setBoardCurrent] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  // ** Reference
  const canvasRef = useRef(null);
  const parent = useRef(null);
  const zoomWrapper = useRef(null);
  // ** Contexts
  const {
    board,
    setBoard,
    selectedItem,
    url,
    setSelectedItem,
    setScale,
    scale,
    currentPage,
    setCurrentPage,
    undoList,
    setUndoList,
    redoList,
    setRedoList
  } = useContext(DocumentContext);

  //** Functions
  //   const handleZoomDropdown = () => setzoomOpen((prevState) => !prevState);
  //   const handleZoomChange = (value)=>{
  //     const {zoomIn,zoomOut,resetTransform } = zoomWrapper.current
  //     if(value>1){
  //         //zoomIn
  //         resetTransform()
  //         zoomIn(value)
  //     }
  //     else if(value===0){
  //         resetTransform()
  //     }
  //     else{
  //         //zoom out
  //         resetTransform()
  //         zoomOut(value)
  //     }
  //     setZoom(value)
  //   }
  const handleZoomIn = () => {
    const { zoomIn } = zoomWrapper.current;
    zoomIn();
  };
  const handleZoomOut = () => {
    const { zoomOut } = zoomWrapper.current;
    zoomOut();
  };
  const handleFitWindow = () => {
    const { resetTransform } = zoomWrapper.current;
    resetTransform();
  };
  const handleDisabled = () => {
    setIsDisabled(!isDisabled);
  };
  const handlePageClick = (pageNumber) => {
    renderPage(pageNumber);
    //update page properties
    setCurrentPage(pageNumber);
    //get new page previous properties
  };

  const OnClickUndo = () => {};
  const OnClickRedo = () => {};
  const onCopy = () => {
    let item = {
      ...selectedItem,
      x: selectedItem.x + 20,
      y: selectedItem.y + 20,
      id: selectedItem.id + 1,
      dataLabel: `${selectedItem.dataLabel}_copy`
    };
    setSelectedItem(item);

    setItemProps(item);
    setUndoList((undoList) => [...undoList, item]);
    setIsChanged(true);
    setBoard((board) => [...board, item]);
  };

  const renderPage = useCallback(
    async (currentPage) => {
      if (pdfFile != null) {
        const page = await pdfFile.getPage(currentPage);
        // let s = zoom;
        // if (zoom === 5) {
        //   const parent = canvasRef.current.parentElement;
        //   s = parent.offsetWidth / page.getViewport({ scale: 1.5 }).width;
        // }
        //setScale(s);
        const parent = canvasRef.current.parentElement;
        const s = parent.offsetWidth / page.getViewport({ scale: 1.5 }).width;
        const viewport = page.getViewport({ scale: 1.5 });

        // Prepare canvas using PDF page dimensions.
        const canvas = canvasRef.current;

        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        setDropHeight(`${canvas.height}px`);
        setDropWidth(`${canvas.width}px`);

        //setDefaultZoom({ x: canvas.width, y: canvas.height, zoom: s });
        // Render PDF page into canvas context.
        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
      }
    },
    [pdfFile]
  );

  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 1; index <= pageCnt; index++) {
        const page = await pdfFile.getPage(index);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.id = index;
        const p = document.createElement('p');
        p.innerHTML = index;
        p.className = 'text-center';
        const div = document.createElement('div');
        div.className = 'text-center';
        div.appendChild(canvas);
        div.appendChild(p);
        // div.onclick = handlePageClick(canvas.id)
        div.addEventListener('click', () => handlePageClick(index));
        const renderContext = { canvasContext, viewport };
        page.render(renderContext);

        parent.current.appendChild(div);
      }
    }
  }, [pageCnt, pdfFile]);

  //loading pdf from url
  useEffect(() => {
    const loadingTask = PDFJS.getDocument(url.url);
    loadingTask.promise.then((loadedPdf) => {
      setPdfFile(loadedPdf);
      setPageCnt(loadedPdf.numPages);
    });
  }, []);

  //render page on canvas
  useEffect(() => {
    if (pdfFile != null) {
      renderPage(currentPage);
    }
  }, [canvasRef, pdfFile]);

  //render all pages on side menu
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0) {
      renderPages();
    }
  }, [pageCnt]);

  useEffect(() => {
    setBoardCurrent(board.filter((b) => b.page === currentPage));
  }, [currentPage]);

  useEffect(() => {
    setBoardCurrent(board.filter((x) => x.page === currentPage));
  }, [board]);
  // useEffect(()=>{
  //     setBoard((board).map((b)=>{
  //         const temp = b
  //         return {...b,left: temp.left*scale/temp.scale,top:temp.top * scale/temp.scale, formatting:scale * 100 , scale:scale }
  //     }))

  // },[scale])
  return (
    <>
      {
        <Row>
          <Col sm="10">
            <div className="w-100 text-center mb-1 d-flex justify-content-center">
              <Button
                color="link"
                className="px-1 py-0"
                onClick={OnClickUndo}
                disabled={board.length > 0 ? false : true}
              >
                <FaUndo />
              </Button>
              <Button
                color="link"
                className="px-1 py-0"
                onClick={OnClickRedo}
                disabled={indexUndoRedo > 1 ? false : true}
              >
                <FaRedo />
              </Button>
              <Button
                color="link"
                className="px-1 py-0"
                onClick={onCopy}
                disabled={board.length > 0 ? false : true}
              >
                <Copy />
              </Button>
              {/* <UncontrolledButtonDropdown
              isOpen={zoomOpen}
              toggle={handleZoomDropdown}
              
              style={{ width: '160px' }}
            >
              <DropdownToggle
                outline
                color="primary"
                caret
                className="w-100"
                style={{ borderRadius: 'none' }}
              >
                {zoom && (zoom === 0 ? 'Fit to window' : `${zoom * 100} %`)}
              </DropdownToggle>
              <DropdownMenu className="w-100">
                <DropdownItem className="w-100" onClick={() => handleZoomChange(0.25)} >
                  25%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(0.5)}>
                  50%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(0.75)}>
                  75%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(1)}>
                  100%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(1.25)}>
                  125%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(1.5)}>
                  150%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(1.75)}>
                  175%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(2)}>
                  200%
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleZoomChange(0)}>
                  Fit to window
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown> */}
              <div className="d-flex border-primary rounded" style={{ width: '135px' }}>
                <Button color="link" className="p-0" onClick={handleZoomOut}>
                  <Minus />
                </Button>
                <Button color="link" onClick={handleFitWindow}>
                  100%
                </Button>

                <Button color="link" className="p-0" onClick={handleZoomIn}>
                  <Plus />
                </Button>
              </div>
            </div>
            <TransformWrapper
              minScale={0.25}
              maxScale={4}
              ref={zoomWrapper}
              disablePadding={true}
              initialScale={1}
              disabled={isDisabled}
              wheel={{ disabled: true }}
              id="transformWrapper"
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <TransformComponent
                    wrapperStyle={{ width: '100%', top: '0px' }}
                    contentStyle={{ width: '100%', top: '0px' }}
                  >
                    <div className="d-flex justify-content-center w-100">
                      <canvas ref={canvasRef} />
                      <div
                        className="Board border-primary mx-0"
                        style={{
                          position: 'absolute',
                          display: 'block',
                          width: `${dropWidth}`,
                          height: `${dropHeight}`
                        }}
                        id="dropDiv"
                      >
                        {boardCurrent.length > 0 &&
                          boardCurrent.map((item, idx) => {
                            switch (item?.type) {
                              case 'sign':
                                return (
                                  <SignBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'initial':
                                return (
                                  <InitialBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'stamp':
                                return (
                                  <StampBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'signDate':
                                return (
                                  <SignDateBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );

                              case 'name':
                                return (
                                  <NameBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'email':
                                return (
                                  <EmailBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'company':
                                return (
                                  <CompanyBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'title':
                                return (
                                  <TitleBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'text':
                                return (
                                  <TextBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'checkbox':
                                return (
                                  <CheckboxBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'radio':
                                return (
                                  <RadioBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'dropdown':
                                return (
                                  <DropdownBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'drawing':
                                return (
                                  <DrawingBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'formula':
                                return (
                                  <FormulaBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'attachment':
                                return (
                                  <AttachmentBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'note':
                                return (
                                  <NoteBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'approve':
                                return (
                                  <ApproveBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'decline':
                                return (
                                  <DeclineBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              case 'line':
                                return (
                                  <LineBoard
                                    key={idx}
                                    item={item}
                                    handleDisabled={handleDisabled}
                                  />
                                );
                              default:
                                return <></>;
                            }
                          })}
                      </div>
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </Col>
          <Col sm="2">
            <PropertiesMenu item={itemProps} />
            <div ref={parent}></div>
          </Col>
        </Row>
      }
    </>
  );
}
