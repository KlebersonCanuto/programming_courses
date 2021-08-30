import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import api from '../../services/api';
import { quillFormats, quillModules } from '../../services/util';

const MaterialForm = ({ closeModal, moduleId, id }) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [complementary, setComplementary] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
      api.get(`/materials/details/${id}`).then((res) => {
        setTitle(res.data.data.title);
        setContent(res.data.data.content);
        setComplementary(res.data.data.complementary);
      }).catch(() => {
        toast.error('Falha ao carregar material');
        closeModal();
      });
    }
  }, [id, closeModal]);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ModuleId: moduleId,
      complementary,
      title,
      content,
      number: 0
    };

    let request, op;
    if (id) {
      request = api.put(`/materials/${id}`, data);
      op = 'editado';
    } else {
      request = api.post('/materials', data);
      op = 'criado';
    }

    request.finally(() => {
      setLoading(false);
    }).then(() => {
      toast.success(`Material ${op} com sucesso`);
      closeModal();
    }).catch(() => {
      toast.error('Falha ao salvar material');
    });
  }

  return (
    <Modal size="lg" show={true} onHide={() => closeModal()}>
      <Container>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <span className="f4 b"> {id? "Editar" : "Adicionar"} material</span>
          </Modal.Header>

          <Form.Group controlId="title" className="pt3">
            <p className="tc b">Título</p>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="content" className="pt3">
            <p className="tc b">Conteúdo</p>
            <ReactQuill value={content} onChange={setContent} formats={quillFormats} modules={quillModules}/>
          </Form.Group>
        
          <Form.Group controlId="complementary" className="pt3 pb3">
            <Form.Check 
              type="switch"
              checked={complementary}
              onChange={() => setComplementary(!complementary)}
              label="Material complementar"
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="danger" onClick={() => closeModal()}>
              Fechar
            </Button>
            {
              loading ? (
                <Button variant="success" disabled>
                  <Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true"/> Salvando...
                </Button>
              ) :
                <Button variant="success" type="submit">
                  Salvar
                </Button>
            }
          </Modal.Footer>
        </Form>
      </Container>
    </Modal>
  );
};

export default MaterialForm;