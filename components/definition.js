const React = require('react');
const ImmutablePropTypes = require('react-immutable-proptypes');
const Component = require('react-pure-render/component');
const ObjectDefinitionTable = require('./objectDefinitionTable');

class Definition extends Component {

  static propTypes = {
    definitions: ImmutablePropTypes.map,
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
    const { definitions } = this.props;
    const { showDefinition } = this.state;

    return (
      <div>
        {IS_JAVASCRIPT &&
          <a
            onClick={this.handleToggle}
            style={{ cursor: 'pointer' }}
          >
            <span>{showDefinition ? 'Hide' : 'Show'}</span> definition &raquo;
          </a>
        }
        {(showDefinition || !IS_JAVASCRIPT) && <ObjectDefinitionTable definitions={definitions} />}
      </div>
    );
  }

}

module.exports = Definition;