import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

class PaginationComponent extends Component {

  state = {
    prevDone: false
  }

  constructor(props) {
    super(props);
    this.state = {
      activePage: this.props.activePage,
      firstPaginationNumber: 1
    };
    this.pages = this.getNumberOfPages(this.props);
  }

  componentWillReceiveProps(props) {
    this.pages = this.getNumberOfPages(props);
    this.setState({
      activePage: props.activePage
    });
    this.forceUpdate();
  }

  getNumberOfPages = props => {
    const auxPages = props.totalItems / props.pageSize;
    let pages = parseInt(auxPages, 10);
    pages += pages !== auxPages ? 1 : 0;
    return pages;
  };

  paginationItems = () => {
    let items = [];
    this.lastPaginationNumber = this.getLastPaginationNumber();
    // items.push(this.firstOrLastPagItem(this.props.firstPageText, 1, "first"));
    items.push(this.nextOrPreviousPagItem(this.props.previousPageText, 1, "l"));
    for (
      var i = this.state.firstPaginationNumber;
      i <= this.lastPaginationNumber;
      i++
    ) {
      items.push(this.numberedPagItem(i));
    }
    items.push(
      this.nextOrPreviousPagItem(this.props.nextPageText, this.pages, "r")
    );
    // items.push(this.firstOrLastPagItem(this.props.lastPageText, this.pages, "last"));
    return items;
  };

  getLastPaginationNumber = () => {
    const minNumberPages = Math.min(
      this.pages,
      this.props.maxPaginationNumbers
    );
    return this.state.firstPaginationNumber + minNumberPages - 1;
  };

  numberedPagItem = i => {
    return (
      <PaginationItem
        key={i}
        id={`pagebutton${i}`}
        active={this.state.activePage === i}
        onClick={this.handleClick}
      >
        <PaginationLink>{i}</PaginationLink>
      </PaginationItem>
    );
  };

  nextOrPreviousPagItem = (name, page, direction) => {
    return (
      <PaginationItem
        key={direction}
        disabled={this.state.activePage === page}
        onClick={e => this.handleSelectNextOrPrevious(direction)}
      >
        <PaginationLink>{name}</PaginationLink>
      </PaginationItem>
    );
  };

  firstOrLastPagItem = (name, page, key) => {
    let event = {
      currentTarget: {
        getAttribute: () => `pagebutton${page}`
      }
    };
    return (
      <PaginationItem
        key={key}
        disabled={this.state.activePage === page}
        onClick={() => this.handleClick(event)}
      >
        <PaginationLink>{name}</PaginationLink>
      </PaginationItem>
    );
  };

  handleClick = event => {
    const newActivePage = parseInt(
      event.currentTarget
        .getAttribute("id")
        .split("pagebutton")
        .pop(),
      10
    );
    this.setState({
      activePage: newActivePage
    });
    this.handlePaginationNumber(newActivePage);
    this.props.onSelect(newActivePage);
  };

  handleSelectNextOrPrevious = direction => {
    const activePage = this.state.activePage;
    if (
      (direction === "r" && activePage === this.pages) ||
      (direction === "l" && activePage === 1)
    )
      return;

    const newActivePage = direction === "r" ? activePage + 1 : activePage - 1;

    this.setState({
      activePage: newActivePage
    });

    this.handlePaginationNumber(newActivePage);
    this.props.onSelect(newActivePage);
  };

  handlePaginationNumber = activePage => {
    const distance = Math.floor(this.props.maxPaginationNumbers / 2);
    const newFPNumber = activePage - distance;
    const newLPNumber = activePage + distance;
    if (newFPNumber <= distance) {
      if (this.state.firstPaginationNumber !== 1) {
        this.setState({
          firstPaginationNumber: 1
        });
      }
    } else if (newLPNumber <= this.pages) {
      this.setState({
        firstPaginationNumber: newFPNumber
      });
    } else if (newLPNumber >= this.pages) {
      this.setState({
        firstPaginationNumber: this.pages - this.props.maxPaginationNumbers + 1
      });
    }
  };

  render() {
    return <Pagination className={this.props.className} listClassName={this.props.listClassName}>{this.paginationItems()}</Pagination>;
  }
}

PaginationComponent.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  maxPaginationNumbers: PropTypes.number,
  activePage: PropTypes.number,
  // firstPageText: PropTypes.node,
  previousPageText: PropTypes.node,
  nextPageText: PropTypes.node,
  // lastPageText: PropTypes.node
};

PaginationComponent.defaultProps = {
  maxPaginationNumbers: 5,
  activePage: 1,
  // firstPageText: <i className="fa fa-angle-double-left"></i>,
  // previousPageText: <i className="fa fa-angle-left"></i>,
  // nextPageText: <i className="fa fa-angle-right"></i>,
  // lastPageText: <i className="fa fa-angle-double-right"></i>
  previousPageText: <IoIosArrowBack size={14}/>,
  nextPageText: <IoIosArrowForward size={14}/>,
};

export default PaginationComponent;