const React = require('react');
const Component = require('react-pure-render/component');
const ImmutablePropTypes = require('react-immutable-proptypes');
const _ = require('lodash');

class Sidebar extends Component {

  static propTypes = {
    schemas: ImmutablePropTypes.list.isRequired,
  };

  render() {
    const { schemas } = this.props;

    return (
      <nav className="col-lg-3">
        {schemas.filter(schema => !schema.get('hidden')).valueSeq().map(schema =>
          <div className="panel panel-default" key={schema.get('id')}>
            <div className="panel-heading"><h4>{schema.get('title')}</h4></div>
            <ul className="nav nav-pills nav-stacked">
              {schema.get('links').valueSeq().map(link =>
                <li key={link.get('html_id')}>
                  <a href={`#${link.get('html_id')}`}>
                    {link.get('title')}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    );
  }

}

module.exports = Sidebar;
