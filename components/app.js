const React = require('react');
const ImmutablePropTypes = require('react-immutable-proptypes');
const Component = require('react-pure-render/component');
const Sidebar = require('./sidebar');
const Schema = require('./schema');

class App extends Component {

  static propTypes = {
    schemas: ImmutablePropTypes.list.isRequired,
    config: React.PropTypes.object,
  };

  render() {
    const { schemas, config } = this.props;

    return (
      <div className="container">
        <header className="row">
          <hgroup className="col-lg-12">
            <div className="page-header">
              <h1>{config.title}</h1>
            </div>
          </hgroup>
        </header>

        <div className="row">
          <Sidebar schemas={schemas} />
          <div className="col-lg-9">
            {schemas
              .filter(schema => !schema.get('hidden'))
              .valueSeq()
              .map(schema => <Schema key={schema.get('id')} schema={schema} />)
            }
          </div>
        </div>
      </div>
    );
  }

}

module.exports = App;
