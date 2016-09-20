'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PieChart = (function (_React$Component) {
  _inherits(PieChart, _React$Component);

  function PieChart() {
    _classCallCheck(this, PieChart);

    _get(Object.getPrototypeOf(PieChart.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PieChart, [{
    key: 'handleMouseEnterOnSector',
    value: function handleMouseEnterOnSector(i) {
      var onMouseEnterOnSector = this.props.onMouseEnterOnSector;

      if (onMouseEnterOnSector) {
        onMouseEnterOnSector(i);
      }
    }
  }, {
    key: 'handleMouseLeaveFromSector',
    value: function handleMouseLeaveFromSector() {
      var onMouseLeaveFromSector = this.props.onMouseLeaveFromSector;

      if (onMouseLeaveFromSector) {
        onMouseLeaveFromSector(null);
      }
    }
  }, {
    key: 'getSectors',
    value: function getSectors() {
      var _this = this;

      var _props = this.props;
      var data = _props.data;
      var palette = _props.palette;
      var sectorStrokeWidth = _props.sectorStrokeWidth;
      var expandOnHover = _props.expandOnHover;
      var expandedSector = _props.expandedSector;
      var expandPx = _props.expandPx;
      var viewBoxWidth = _props.viewBoxWidth;

      var total = Math.ceil(data.reduce(function (n, d) {
        return d.value + n;
      }, 0));
      var center = viewBoxWidth / 2;
      var startAngle = 0;
      var endAngle = 0;

      return data.map(function (d, i) {
        var expandVal = expandOnHover && expandedSector === i ? expandPx : 0;
        var angle = 360 * d.value / total;
        var largeArc = d.value / total <= 0.5 ? 0 : 1;

        startAngle = endAngle;
        endAngle = startAngle + angle;

        var x1 = Math.round(center + (center + expandVal) * Math.cos(Math.PI * startAngle / 180));
        var y1 = Math.round(center + (center + expandVal) * Math.sin(Math.PI * startAngle / 180));

        var x2 = Math.round(center + (center + expandVal) * Math.cos(Math.PI * endAngle / 180));
        var y2 = Math.round(center + (center + expandVal) * Math.sin(Math.PI * endAngle / 180));

        var dPath = 'M' + center + ',' + center + ' ' + 'L' + x1 + ',' + y1 + ' ' + 'A' + (center + expandVal) + ',' + (center + expandVal) + ' 0 ' + largeArc + ',1 ' + x2 + ',' + y2 + ' ' + 'z';

        return _react2['default'].createElement('path', {
          key: 'sector' + i,
          d: dPath,
          fill: d.color || palette[i % palette.length],
          stroke: '#fff',
          strokeWidth: sectorStrokeWidth,
          onMouseEnter: function () {
            return _this.handleMouseEnterOnSector(i);
          },
          onMouseLeave: function () {
            return _this.handleMouseLeaveFromSector();
          } });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var expandPx = _props2.expandPx;
      var viewBoxWidth = _props2.viewBoxWidth;
      var props = _props2.props;

      return _react2['default'].createElement(
        'svg',
        _extends({ viewBox: '0 0 ' + (viewBoxWidth + expandPx * 2) + ' ' + (viewBoxWidth + expandPx * 2) }, props),
        _react2['default'].createElement(
          'g',
          { transform: 'translate(' + expandPx + ', ' + expandPx + ')' },
          this.getSectors()
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      data: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        value: _react.PropTypes.number,
        color: _react.PropTypes.string
      })),
      palette: _react.PropTypes.arrayOf(_react.PropTypes.string),
      sectorStrokeWidth: _react.PropTypes.number,
      expandOnHover: _react.PropTypes.bool,
      expandedSector: _react.PropTypes.number,
      onSectorHover: _react.PropTypes.func,
      expandPx: _react.PropTypes.number,
      viewBoxWidth: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      data: [],
      palette: ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c', '#1abc9c'],
      sectorStrokeWidth: 3,
      expandOnHover: true,
      expandedSector: null,
      expandPx: 10,
      viewBoxWidth: 300
    },
    enumerable: true
  }]);

  return PieChart;
})(_react2['default'].Component);

exports['default'] = PieChart;
module.exports = exports['default'];