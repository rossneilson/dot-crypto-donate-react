"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CryptoDonate;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ether = require("../helper/ether");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const Container = _styledComponents.default.section(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  margin-top: 50px;\n"])));

const Title = _styledComponents.default.h1(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  text-align: left;\n  font-size: smaller;\n  margin: 0px;\n  padding: 2%;\n  width: 25%;\n  background-color: ", ";\n"])), props => props.colors.secondary);

const Input = _styledComponents.default.section(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  background-color: ", ";\n  width: 100%;\n"])), props => props.colors.secondary);

const CcySelector = _styledComponents.default.select(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border: 0px solid #fff;\n  background-color: ", ";\n  color: ", ";\n  border-radius: 5px 0px 0px 5px;\n  margin: auto 0px;\n  height: 50px;\n"])), props => props.colors.primary, props => props.colors.text);

const AmountInput = _styledComponents.default.input(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  border: 0px solid #fffbfb;\n  background-color: ", ";\n  color: ", ";\n  height: 50px;\n  width: 60%;\n  border-radius: 0px;\n"])), props => props.colors.primary, props => props.colors.text);

const DonateButton = _styledComponents.default.button(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  transition: 0.2s;\n  height: 50px;\n  background-color: ", ";\n  color: ", ";\n  justify-content: space-around;\n  font-weight: 500;\n  border: none;\n  cursor: pointer;\n  border-radius: 5px;\n  margin: auto;\n  border-radius: 0px 5px 5px 0px;\n  width: 40%;\n  &:hover {\n    background-color: ", ";\n  }\n  &:focus {\n    background-color: ", ";\n  }\n"])), props => props.colors.button, props => props.colors.text, props => props.colors.buttonSecondary, props => props.colors.buttonSecondary);

const Output = _styledComponents.default.section(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 100%;\n  margin: auto;\n  padding: 2%;\n  background-color: ", ";\n"])), props => props.error ? "#f7b7ad" : "#cfebdf");

function CryptoDonate(_ref) {
  let {
    cryptoDomain,
    infuraApi,
    colors,
    text,
    ens = null
  } = _ref;
  const [addressBook, setAddressBook] = (0, _react.useState)({});
  const [selectedCcy, setSelectedCcy] = (0, _react.useState)("ETH");
  const [error, setError] = (0, _react.useState)(null);
  const [success, setSuccess] = (0, _react.useState)(null);
  const [amount, setAmount] = (0, _react.useState)("0.0");
  (0, _react.useEffect)(() => {
    async function fetchAddresses() {
      setAddressBook(_objectSpread(_objectSpread({}, await (0, _ether.fetchContractData)(cryptoDomain, infuraApi)), {}, {
        ENS: ens
      }));
    }

    fetchAddresses();
  }, []);

  const donate = async () => {
    try {
      const donation = await (0, _ether.donateWithEther)(addressBook["ETH"], amount);

      if (donation) {
        setError(null);
        setSuccess(donation);
      }
    } catch (err) {
      setError(err);
    }
  };

  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(Title, {
    colors: colors
  }, text.title), /*#__PURE__*/_react.default.createElement(Input, {
    colors: colors,
    style: {
      padding: "6%"
    }
  }, /*#__PURE__*/_react.default.createElement(CcySelector, {
    name: "crypto",
    id: "crypto",
    value: selectedCcy,
    onChange: event => setSelectedCcy(event.target.value),
    colors: colors
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "ETH"
  }, "ETH"), ens ? /*#__PURE__*/_react.default.createElement("option", {
    value: "ENS"
  }, "ENS") : null, /*#__PURE__*/_react.default.createElement("option", {
    value: "BTC"
  }, "BTC")), selectedCcy === "ETH" ? /*#__PURE__*/_react.default.createElement(Input, {
    colors: colors
  }, /*#__PURE__*/_react.default.createElement(AmountInput, {
    type: "number",
    id: "amount",
    name: "amount",
    value: amount,
    onChange: event => setAmount(event.target.value),
    step: "0.1",
    min: "0",
    colors: colors
  }), /*#__PURE__*/_react.default.createElement(DonateButton, {
    onClick: donate,
    colors: colors,
    "aria-label": "Send ethereum"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "40",
    height: "40",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#ffffff",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      marginTop: "4px"
    }
  }, /*#__PURE__*/_react.default.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M6 12l6 -9l6 9l-6 9z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M6 12l6 -3l6 3l-6 2z"
  })))) : /*#__PURE__*/_react.default.createElement(Input, {
    colors: colors
  }, /*#__PURE__*/_react.default.createElement(AmountInput, {
    style: {
      width: "75%"
    },
    type: "text",
    id: "address",
    name: "address",
    value: addressBook[selectedCcy],
    colors: colors
  }), /*#__PURE__*/_react.default.createElement(DonateButton, {
    "aria-label": "Copy address",
    onClick: () => {
      navigator.clipboard.writeText(addressBook[selectedCcy]);
      setError(null);
      setSuccess(text.copied);
    },
    colors: colors
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#ffffff",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      marginTop: "6px"
    }
  }, /*#__PURE__*/_react.default.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/_react.default.createElement("rect", {
    x: "8",
    y: "8",
    width: "12",
    height: "12",
    rx: "2"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
  }))))), error ? /*#__PURE__*/_react.default.createElement(Output, {
    error: true
  }, error.message) : success ? /*#__PURE__*/_react.default.createElement(Output, null, text.thanks, /*#__PURE__*/_react.default.createElement("br", null), selectedCcy === "ETH" ? /*#__PURE__*/_react.default.createElement("a", {
    href: "https://etherscan.io/tx/".concat(success.hash),
    target: "_blank"
  }, success.hash) : /*#__PURE__*/_react.default.createElement("div", null, text.copied)) : null);
}