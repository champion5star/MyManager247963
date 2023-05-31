import React, { useContext, useRef, useState, useCallback, useEffect } from 'react';
import SlideDown from 'react-slidedown';
import Repeater from '../../../@core/components/repeater';
import { DocumentContext } from '../../../utility/context/Document';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import { decodeFromBase64 } from 'pdf-lib';

import { getDocumentWithToken } from '../../../requests/documents/create-doc';
import Sign from './properties/sign/Sign';
import Approve from './properties/Approve';
import Decline from './properties/decline/Decline';
import Radio from './properties/Radio';
import Checkbox from './properties/Checkbox';
import SignedDate from './properties/SignedDate';
import Name from './properties/Name';
import Email from './properties/Email';
import Drawing from './properties/drawing/Drawing';
import Note from './properties/Note';
import Title from './properties/Title';
import Company from './properties/Company';
import Initial from './properties/Initial';
import Formula from './properties/Formula';
import Text from './properties/Text';
import Stamp from './properties/stamp/Stamp';
import Attachment from './properties/attachment/Attachment';
import Dropdown from './properties/Dropdown';
import { Button } from 'reactstrap';
import {
  editDocFromRecipient,
  useUploadSignature
} from '../../../requests/documents/recipient-doc';
import SessionExpires from './SessionExpires';
import { mergeAllFiles } from '../helpers/loadPdfHelper';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export default function Preview() {
  const [pageCnt, setPageCnt] = useState(0);
  const [pdfFile, setPdfFile] = useState();
  const [boardDimention, setBoardDimention] = useState({ x: 0, y: 0 });
  const [documentId, setDocumentId] = useState();
  const [isDone, setIsDone] = useState(false);
  const [attachments, setAttachments] = useState([]); //{id:,files:[]}
  const [sessionExpired, setSessionExpired] = useState(false);
  // ** Context
  const {
    board,
    scale,
    setBoard,
    setScale,
    setRecipients,
    setHashcode,
    recipients,
    hashcode,
    signature,
    selectedItem,
    stamp
  } = useContext(DocumentContext);

  const canvasRef = useRef([]);

  const renderPages = useCallback(async () => {
    if (pdfFile != null && pageCnt > 0) {
      for (let index = 0; index < pageCnt; index++) {
        const page = await pdfFile.getPage(index + 1);
        const viewport = page.getViewport({ scale: 1.5 * scale });
        const temp = canvasRef.current;
        const canvas = temp[index];

        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.id = index;
        setBoardDimention({ x: canvas.width, y: canvas.height });

        const renderContext = { canvasContext, viewport };
        page.render(renderContext);
        //parent.current.appendChild(div)
      }
    }
  }, [pageCnt, pdfFile, scale]);

  const handleFinishLater = async () => {
    let boardTemp = board;
    if (attachments.length > 0) {
      const mergedFile = await mergeAllFiles(attachments[0].files);
      const formData = new FormData();
      formData.append('file', mergedFile);
      const data = await useUploadSignature(formData);

      if (data.success === true) {
        boardTemp.map((b) => {
          let temp = b;
          if (temp.id === attachments[0].id && temp.type === 'attachment') {
            temp.list = [];
            temp.list.push(data.url);
          }
          return temp;
        });
        const payload = {
          properties: boardTemp
        };
        editDocFromRecipient(
          documentId,
          payload,
          false,
          localStorage.getItem('recipientToken')
        ).then((res) => {
          if (res.success) {
            setIsDone(false);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
          }
        });
      }
    } else {
      const payload = {
        properties: boardTemp
      };

      editDocFromRecipient(documentId, payload, false, localStorage.getItem('recipientToken')).then(
        (res) => {
          if (res.success) {
            setIsDone(false);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
          }
        }
      );
    }
  };
  const handleFinish = async () => {
    //update recipients where is finished
    let recipientsTemp = recipients;
    recipientsTemp.map((rec) => {
      if (rec.hashCode === hashcode) {
        rec.isDone = true;
      }
      return rec;
    });

    let boardTemp = board;

    if (attachments.length > 0) {
      const mergedFile = await mergeAllFiles(attachments[0].files);
      const formData = new FormData();
      formData.append('file', mergedFile);
      const data = await useUploadSignature(formData);
      boardTemp.map((b) => {
        let temp = b;
        if (temp.id === attachments[0].id && temp.type === 'attachment') {
          temp.list = urls;
        }
        if (temp.recipient.hashCode === hashcode && temp.isDone) {
          temp.recipient.isDone = true;
        }
        return temp;
      });
      const allIsDone = recipientsTemp.every((x) => x.isDone === true);
      //save -- update recipient board
      const payload = {
        recipients: recipientsTemp,
        properties: boardTemp,
        isDone: allIsDone
      };
      editDocFromRecipient(documentId, payload, false, localStorage.getItem('recipientToken')).then(
        (res) => {
          if (res.success) {
            setIsDone(false);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
          }
        }
      );
    } else {
      boardTemp.map((b) => {
        let temp = b;

        if (temp.recipient.hashCode === hashcode && temp.isDone) {
          temp.recipient.isDone = true;
        }
        return temp;
      });
      const allIsDone = recipientsTemp.every((x) => x.isDone === true);
      //save -- update recipient board
      const payload = {
        recipients: recipientsTemp,
        properties: boardTemp,
        isDone: allIsDone
      };

      editDocFromRecipient(documentId, payload, false, localStorage.getItem('recipientToken')).then(
        (res) => {
          if (res.success) {
            setIsDone(false);
            setBoard(res.data.properties);
            setRecipients(res.data.recipients);
          }
        }
      );
    }
  };

  useEffect(() => {
    const windowUrl = window.location.href.split('/');
    const hashcode = windowUrl[windowUrl.length - 1];
    setHashcode(hashcode);
    const token = localStorage.getItem('recipientToken');
    const expTime = localStorage.getItem('recipientExpireTime');
    const now = Date.now();
    if (now < Number(expTime) && token) {
      setSessionExpired(false);
      getDocumentWithToken(token, hashcode).then((data) => {
        const doc = data;
        setDocumentId(doc.documentId);
        if (doc.recipients.find((x) => x.hashCode === hashcode).isDone === true) {
          setIsDone(true);
        } else {
          setIsDone(false);
        }
        const loadingTask = PDFJS.getDocument(doc.documentUrl);
        loadingTask.promise.then((loadedPdf) => {
          setPdfFile(loadedPdf);
          setPageCnt(loadedPdf.numPages);
          setBoard(doc.properties);
          setRecipients(doc.recipients);
          setScale(1);
        });
        //set hasViewed true

        let rec = doc.recipients.find((x) => x.hashCode === hashcode);
        rec = { ...rec, hasViewed: true };
        let recs = doc.recipients.filter((x) => x.hashCode != hashcode);
        const payload = {
          recipients: [...recs, rec]
        };
        editDocFromRecipient(
          doc.documentId,
          payload,
          false,
          localStorage.getItem('recipientToken')
        );
      });
    } else {
      // your session is expired
      setSessionExpired(true);
    }

    //get document from localDB
    // const pdf = decodeFromBase64(localStorage['pdf'])
    // const loadingTask = PDFJS.getDocument(pdf)
  }, []);

  //render page on canvas
  useEffect(() => {
    if (pdfFile != null && pageCnt > 0 && board.length > 0) {
      renderPages();
    }
  }, [scale]);

  useEffect(() => {
    let temp = [];

    if (selectedItem.type === 'sign' && signature.initials) {
      //when initial & signature selected together
      for (const b of board) {
        let i = b;
        if (i.id === selectedItem.id && i.type === selectedItem.type) {
          if (signature.id) {
            i.isDone = true;
            i.signValue = {
              name: signature.fullName,
              path: signature.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        } else if (i.type === 'initial' && i.recipient.hashCode === hashcode) {
          if (signature.id) {
            i.isDone = true;
            i.signValue = {
              name: signature.initials.initial,
              path: signature.initials.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        }
        temp.push(i);
      }
    } else if (selectedItem.type === 'stamp') {
      for (const b of board) {
        let i = b;
        if (i.id === selectedItem.id && i.type === selectedItem.type) {
          if (stamp.id) {
            i.isDone = true;
            i.signValue = {
              name: stamp.departmentName,
              path: stamp.path
            };
            //i.recipient.isDone=true
          } else {
            i.isDone = false;
            i.signValue = {};
            //i.recipient.isDone=false
          }
        }
        temp.push(i);
      }
    } else {
      for (const b of board) {
        let i = b;
        if (i.id === selectedItem.id && i.type === selectedItem.type) {
          if (selectedItem.type === 'initial') {
            if (signature.id) {
              i.isDone = true;
              i.signValue = {
                name: signature.initials.initial,
                path: signature.initials.path
              };
              //i.recipient.isDone=true
            } else {
              i.isDone = false;
              i.signValue = {};
              //i.recipient.isDone=false
            }
          } else {
            if (signature.id) {
              i.isDone = true;
              i.signValue = {
                name: signature.fullName,
                path: signature.path
              };
              //i.recipient.isDone=true
            } else {
              i.isDone = false;
              i.signValue = {};
              //i.recipient.isDone=false
            }
          }
        }
        temp.push(i);
      }
    }

    setBoard(temp);
  }, [signature, stamp]);

  return (
    <>
      {sessionExpired === true ? (
        <SessionExpires />
      ) : (
        <>
          {isDone === false && (
            <div className="container-fluid ">
              <div className="d-flex justify-content-end pt-1">
                <Button color="primary" className="me-2" onClick={handleFinish}>
                  Finish
                </Button>
                <Button color="primary" outline onClick={handleFinishLater}>
                  Finish later
                </Button>
              </div>
            </div>
          )}
          <hr />
          <div>
            <div className="d-flex justify-content-center">
              <Repeater count={pageCnt}>
                {(i = 1) => {
                  const Tag = i === 0 ? 'div' : SlideDown;
                  return (
                    <Tag key={i} className="d-flex ">
                      <canvas ref={(ref) => canvasRef.current.push(ref)}></canvas>
                      <div
                        className="Board border-primary mx-0"
                        style={{
                          position: 'absolute',
                          display: 'block',
                          width: `${boardDimention.x}px`,
                          height: `${boardDimention.y}px`
                        }}
                      >
                        {board
                          .filter(
                            (x) =>
                              x.page === i + 1 &&
                              (x.recipient.hashCode === hashcode || x.recipient.isDone === true)
                          )
                          .map((item, idx) => {
                            switch (item?.type) {
                              case 'sign':
                                return <Sign key={idx} item={item} scale={scale} isDone={isDone} />;
                              case 'initial':
                                return (
                                  <Initial key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'stamp':
                                return (
                                  <Stamp key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'signDate':
                                return <SignedDate key={idx} item={item} scale={scale} />;

                              case 'name':
                                return <Name key={idx} item={item} scale={scale} />;
                              case 'email':
                                return <Email key={idx} item={item} scale={scale} />;
                              case 'company':
                                return (
                                  <Company key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'title':
                                return (
                                  <Title key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'text':
                                return <Text key={idx} item={item} scale={scale} isDone={isDone} />;
                              case 'checkbox':
                                return (
                                  <Checkbox key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'radio':
                                return (
                                  <Radio key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'dropdown':
                                return (
                                  <Dropdown key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'drawing':
                                return (
                                  <Drawing key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'formula':
                                return <Formula key={idx} item={item} scale={scale} />;
                              case 'attachment':
                                return (
                                  <Attachment
                                    key={idx}
                                    item={item}
                                    scale={scale}
                                    attachments={attachments}
                                    setAttachments={setAttachments}
                                    isDone={isDone}
                                  />
                                );
                              case 'note':
                                return <Note key={idx} item={item} scale={scale} />;
                              case 'approve':
                                return (
                                  <Approve key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              case 'decline':
                                return (
                                  <Decline key={idx} item={item} scale={scale} isDone={isDone} />
                                );
                              // case 'line':
                              //     return (
                              //         <LineBoard
                              //             key={idx}
                              //             item={item}
                              //         />
                              //     )
                              default:
                                return <></>;
                            }
                          })}
                      </div>
                    </Tag>
                  );
                }}
              </Repeater>
            </div>
          </div>
        </>
      )}
    </>
  );
}
