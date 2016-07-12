const React = require('react');
const ImmutablePropTypes = require('react-immutable-proptypes');

class App extends Component {

  static propTypes = {
    schemas: ImmutablePropTypes.list.isRequired,
  };

  render() {
    const { schemas } = this.props;

    return (
      <div>
        {schemas
          .valueSeq()
          .map(schema => <div key={schema.get('id')}>{schema.get('title')}</div>)
        }
      </div>
    );
  }

}

module.exports = App;
