import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

function Example(props) {
  const { className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          hjkhkshkdjhsakdhak
          {/* <VerticleChart /> */}
        </ModalBody>
      </Modal>
    </div>
  );
}

Example.propTypes = {
  className: PropTypes.string
};

export default Example;
