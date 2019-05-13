import React from 'react';
import { Button, Header, Modal, Form, FormGroup, FormTextArea, Icon } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';

class AddArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', author: '', content: '', source: '', date: '' }
    }

    handleSubmit = () => {
        this.props.addNewArticle(this.state)
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }

    render() {
        const { title, author, content, source, date } = this.state
        return (
            <Modal trigger={
                <Button basic color='green' icon labelPosition="left">
                    <Icon name="add"/>
                    Dodaj
                </Button>
            }>
                <Modal.Header>Dodaj artykuł</Modal.Header>
                <Modal.Content>
                    <Header>Wpisz dane artykułu i go dodaj</Header>
                    <Form onSubmit={ this.handleSubmit }>
                        <FormGroup>
                            <Form.Input
                                label="Tytuł"
                                placeholder='Tytuł artykułu'
                                name='title'
                                value={title}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label="Autor"
                                placeholder='Autor artykułu'
                                name='author'
                                value={author}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <Form.Input
                                label="Źródło"
                                placeholder='Źródło artykułu'
                                name='source'
                                value={source}
                                onChange={this.handleChange}
                            />
                            <DateTimeInput
                                label="Data"
                                placeholder="Data dodania artykułu"
                                name="date"
                                value={date}
                                iconPosition="left"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <br />
                        <FormGroup>
                            <FormTextArea
                                label="Treść"
                                placeholder="Treść artykułu"
                                name="content"
                                value={content}
                                onChange={this.handleChange}
                            />
                        </FormGroup><br />
                        <Form.Button content='Dodaj' />
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default AddArticle;