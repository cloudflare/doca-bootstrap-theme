const React = require('react');
const Component = require('react-pure-render/component');
const _ = require('lodash/core');

class Constraints extends Component {

  static propTypes = {
    constraints: React.PropTypes.object,
  };

  considerType(value) {
    if (_.isString(value)) {
      return `"${value}"`;
    }
    if (_.isNull(value)) {
      return 'null';
    }
    return value;
  }

  render() {
    const { constraints } = this.props;
    if (!constraints) return <div />;
    return (
      <ul className="constraints">
        {constraints.has('default') &&
          <li>{`default value: ${constraints.get('default')}`}</li>
        }

        {(constraints.get('minLength') || constraints.get('minLength') === 0) &&
          <li>min length: {constraints.get('minLength')}</li>
        }

        {(constraints.get('maxLength') || constraints.get('maxLength') === 0) &&
          <li>max length: {constraints.get('maxLength')}</li>
        }

        {(constraints.get('minimum') || constraints.get('minimum') === 0) &&
          <li>min value: {constraints.get('minimum')}</li>
        }

        {(constraints.get('maximum') || constraints.get('maximum') === 0) &&
          <li>max value: {constraints.get('maximum')}</li>
        }

        {constraints.get('enum') ?
          <li>valid values: {constraints.get('enum').valueSeq().map(value =>
            <code key={value}>{this.considerType(value)}</code>
          )
          .reduce((prev, curr) => [prev, ', ', curr])}</li>
        :
          constraints.get('type') === 'boolean' && <li>valid values: (true,false)</li>
        }

        {constraints.get('readOnly') && <li>read only</li>}
        {constraints.get('pattern') && <li>pattern: {constraints.get('pattern')}</li>}
        {constraints.get('notes') && <li>notes: {constraints.get('notes')}</li>}
      </ul>
    );
  }

}

module.exports = Constraints;
