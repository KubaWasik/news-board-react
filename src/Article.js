import React from 'react';
import { Card, Segment, Container, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Article extends React.Component {

    render() {
        return (
            <div className="content">
                <Segment>
                    <Container>
                        <Card fluid color="blue">
                            <Card.Content header={this.props.art.title} />
                            <Card.Content description={this.props.art.content} />
                            <Card.Content extra>
                                <small> {this.props.art.author}, {this.props.art.date} - <a href={this.props.art.source} rel="noopener noreferrer" target="_blank">źródło</a> </small>
                            </Card.Content>
                        </Card>
                    </Container>
                </Segment>
                <Container>
                    <Link to="/">
                        <Button icon labelPosition="left">
                            <Icon name="angle double left"/>
                            Wróć do listy
                        </Button>
                    </Link>
                </Container>
            </div>
        );
    }
}

export default Article;