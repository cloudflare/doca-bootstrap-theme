const React = require('react');
const Endpoint = require('./endpoint');
const ObjectDefinitionTable = require('./objectDefinitionTable');
const MarkdownPreview = require('react-marked-markdown').MarkdownPreview;
const ImmutablePropTypes = require('react-immutable-proptypes');
const Component = require('react-pure-render/component');
const ExampleObject = require('./exampleObject');

class Schema extends Component {

  static propTypes = {
    schema: ImmutablePropTypes.map.isRequired,
  };

  state = {
    showDefinition: false,
  };

  handleToggle = () => {
    this.setState(prevState => ({
      showDefinition: !prevState.showDefinition,
    }));
  };

  render() {
    const { schema } = this.props;
    const { showDefinition } = this.state;
    return (
      <article className="panel panel-primary">
        <div className="panel-heading">
          <div id={schema.get('html_id')} />
          <h2>{schema.get('title')}</h2>
        </div>
        <div className="panel-body">
          <h4>{schema.get('description')}</h4>
          {schema.get('extended_description') &&
            <MarkdownPreview value={schema.get('extended_description')} />}

          <header>
            <h4 id={`${schema.get('html_id')}-properties`}>
              Object definition{schema.getIn(['object_definition', 'objects']).count() > 0 &&
                <span>s</span>}
            </h4>
            <p>View properties and constraints defined on the object</p>

            {IS_JAVASCRIPT &&
              <p>
                <a onClick={this.handleToggle} className="btn btn-warning">
                  <span>{showDefinition ? 'Hide' : 'Show'}</span>{' '}
                  definition{schema.getIn(['object_definition', 'objects']).count() > 0 &&
                    <span>s</span>}
                </a>
              </p>
            }
          </header>

          {(showDefinition || !IS_JAVASCRIPT) &&
            <div>
              {schema.getIn(['object_definition', 'objects']).count() ?
                <div>
                  {schema.getIn(['object_definition', 'objects']).valueSeq().map(obj =>
                    <div key={obj.get('title')}>
                      {obj.get('title') &&
                        <div>
                          <h4>{obj.get('title')}</h4>
                        </div>
                      }
                      {obj.get('example') && <ExampleObject example={obj.get('example')} />}
                      <ObjectDefinitionTable definitions={obj.get('all_props')} />
                    </div>
                  )}
                </div>
              :
                <div>
                  {schema.getIn(['object_definition', 'example']) &&
                    <ExampleObject example={schema.getIn(['object_definition', 'example'])} />
                  }

                  <ObjectDefinitionTable
                    definitions={schema.getIn(['object_definition', 'all_props'])}
                  />
                </div>
              }
            </div>
          }
        </div>
        <div className="list-group">
          {schema
            .get('links')
            .filter(link => !link.get('private'))
            .valueSeq()
            .map(link => <Endpoint key={link.get('html_id')} link={link} />)
          }
        </div>
      </article>
    );
  }

}

module.exports = Schema;
