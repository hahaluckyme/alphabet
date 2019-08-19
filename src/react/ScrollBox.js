const React = require('react');

class ScrollBox extends React.Component {
  scrollRef = null;

  state = {
    prevHeight: 0,
    is_at_bottom: true,
  };

  componentDidMount() {
    window.onresize = () => this.computeStateChange();
  }

  computeStateChange() {
    this.setState({
      is_at_bottom: this.scrollRef.scrollHeight - this.scrollRef.scrollTop - this.scrollRef.clientHeight < 3,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seen !== this.props.seen) {
      this.scrollRef.scrollTop = this.state.prevHeight;
      this.setState({
        prevHeight: this.contentRef.offsetHeight,
      });
    }
    if (prevProps.history.length !== this.props.history.length) {
      this.computeStateChange();
    }
  }

  onScroll() {
    this.computeStateChange();
  }

  render() {
    return (
      <div className="gamewindow fill column">
        <div
          className="textbox fill column scroll"
          onScroll={() => this.onScroll()}
          ref={ref => {
            this.scrollRef = ref;
          }}
        >
          <div
            className="fill column"
            ref={ref => {
              this.contentRef = ref;
            }}
          >
            {this.props.history.map((e, i) => {
              if (i < this.props.seen) {
                return <div className="text seen" key={i}>{e}</div>;
              } else {
                return <div className="text unseen" key={i}>{e}</div>;
              }
            })}
          </div>
        </div>
        <div
          className="butwaittheresmore"
          style={{
            visibility: this.state.is_at_bottom ? 'hidden' : 'visible',
          }}
        />
      </div>
    );
  }

}

export default ScrollBox;
