import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError
      ? <p className="text-red-600">💥 Algo salió mal…</p>
      : this.props.children;
  }
}
