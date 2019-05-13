import React from 'react';
import AddArticle from "./AddArticle";
import Article from "./Article";
import { Button, Icon, Card, Search } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import _ from 'lodash';
import faker from 'faker';

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			news: [
				{
					id: 1,
					title: faker.lorem.sentence(),
					author: faker.name.findName(),
					content: faker.lorem.paragraphs(),
					source: faker.internet.url(),
					date: faker.date.past(1).toLocaleDateString(),
					likes: faker.random.number(100)
				},
				{
					id: 2,
					title: faker.lorem.sentence(),
					author: faker.name.findName(),
					content: faker.lorem.paragraphs(),
					source: faker.internet.url(),
					date: faker.date.past(1).toLocaleDateString(),
					likes: faker.random.number(100)
				},
				{
					id: 3,
					title: faker.lorem.sentence(),
					author: faker.name.findName(),
					content: faker.lorem.paragraphs(),
					source: faker.internet.url(),
					date: faker.date.past(1).toLocaleDateString(),
					likes: faker.random.number(100)
				},
				{
					id: 4,
					title: faker.lorem.sentence(),
					author: faker.name.findName(),
					content: faker.lorem.paragraphs(),
					source: faker.internet.url(),
					date: faker.date.past(1).toLocaleDateString(),
					likes: faker.random.number(100)
				},
				{
					id: 5,
					title: faker.lorem.sentence(),
					author: faker.name.findName(),
					content: faker.lorem.paragraphs(),
					source: faker.internet.url(),
					date: faker.date.past(1).toLocaleDateString(),
					likes: faker.random.number(100)
				}
			],
			searchIsLoading: false,
			searchResults: [],
			searchValue: ''
		};
		this.addNewArticle = this.addNewArticle.bind(this);
		this.remove = this.remove.bind(this);
		this.addLike = this.addLike.bind(this);
  }
  
  remove(index) {
		var old = this.state.news;
		old = [...old.slice(0, index), ...old.slice(index + 1, old.length)];
		this.setState({ news: old });
	}

	addLike(index) {
		var old = this.state.news;
		old[index].likes += 1;
		this.setState({ news: old });
	}

	addNewArticle(art) {
		art.likes = 0;
		let newData = this.state.news;
		newData.push(art);
		this.setState({ data: newData });
	}

	handleResultSelect = (e, { result }) => this.setState({ searchValue: result.id })

  handleSearchChange = (e, { value }) => {
    this.setState({ seachIsLoading: true, searchValue: value });

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(this.state.searchValue), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        searchIsLoading: false,
        searchResults: _.filter(this.state.news, isMatch),
      });
    }, 300);
	}

	resultRenderer = ({ title, id }) => <a href={`/article/${id}`} >{title}</a>

	render() {
		return (
			<Router>
				<div>
					<header className="ui menu">
						<nav className="ui container">
							<a href="/" className="header item ">
								Ogłoszenia lokalne
              </a>
							<div className="header item">
								<AddArticle addNewArticle={this.addNewArticle} />
							</div>
							<div className="header item">
							<label>Szukaj &nbsp;</label>
							<Search
								loading={this.state.searchIsLoading}
								onResultSelect={this.handleResultSelect}
								onSearchChange={_.debounce(this.handleSearchChange, 500, {
									leading: true,
								})}
								results={this.state.searchResults}
								value={this.state.searchValue}
								resultRenderer={this.resultRenderer}
								{...this.props}
							/>
							</div>
						</nav>
					</header>
					<Route
						exact
						path="/"
						render={() => (
							<div className="main">
								<main className="ui main text container">
									<Card.Group>
										{this.state.news.map((value, index) => {
											return (
												<Card fluid>
													<Card.Content>
														<Card.Header as='a'>{value.title}</Card.Header>
														<Card.Meta>
															Data dodania: {value.date}
														</Card.Meta>
														<Card.Description>
															<Button basic color='blue' onClick={() => this.addLike(index)}>
																{" "}
																{value.likes} &nbsp;{" "}
																<Icon
																	color="blue"
																	name="thumbs up outline"
																/>
																Lubię to
															</Button>
															<Link to={`/article/${index}`}>
																<Button basic icon>
																	<Icon
																		name="info circle"
																	/>
																	{" "}	Szczegóły
																</Button>
															</Link>
															<Button basic color='red' floated="right" onClick={() => this.remove(index)}>
																<Icon color="red" name="delete" />
																Usuń artykuł
                              </Button>
														</Card.Description>
													</Card.Content>
												</Card>
											);
										})}
									</Card.Group>
								</main>
							</div>
						)}
					/>
				</div>
				<div>
					<Route
						path="/article/:id"
						render={props => (
							<Article art={this.state.news[props.match.params.id]} />
						)}
					/>
				</div>
			</Router>
		);
	}
}

export default App;
