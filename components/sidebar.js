const React = require('react');
const Component = require('react-pure-render/component');
const ImmutablePropTypes = require('react-immutable-proptypes');

class Sidebar extends Component {

  static propTypes = {
    schemas: ImmutablePropTypes.list.isRequired,
  };

  render() {
    const { schemas } = this.props;

    return (
      <nav id="sidebar-wrapper">
        {schemas.filter(schema => !schema.get('hidden')).valueSeq().map(schema =>
          <ul className="sidebar-nav" key={schema.get('id')}>
            <li className="sidebar-category">{schema.get('title')}</li>
            {schema.get('links').valueSeq().map(link =>
              <li key={link.get('html_id')}>
                <a href={`#${link.get('html_id')}`}>
                  {link.get('title')}
                </a>
              </li>
            )}
          </ul>
        )}
      </nav>
    );
  }

}

module.exports = Sidebar;
