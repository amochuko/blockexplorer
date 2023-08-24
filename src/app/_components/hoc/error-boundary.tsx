'use client';

import React from 'react';

interface State {
  hasError: boolean;
  err: any;
}
interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, err: '' };
  }

  static getDerivedStateFromError(err: any) {
    return { hasError: true };
  }

  componentDidCatch(err: any, info: any) {
    this.setState({ err });
    console.log(err);
    console.info(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'teal', fontSize: '24px' }}>{this.state.err}</div>
      );
    }

    return this.props.children;
  }
}
