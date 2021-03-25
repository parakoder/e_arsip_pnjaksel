/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Gap from "../../components/Gap";
import { FiSearch } from "react-icons/fi";
import { RiCalendar2Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import "../archive_pidana/archive.scss";
import { MdModeEdit } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import ModalExportArchive from "../../components/modal/ModalExportArchive";
import DatePicker from "react-datepicker";
import { GetArsipPerdata } from "../../configs/handler/ArsipHandler";
import { useHistory } from "react-router-dom";
import PaginationComponent from "../../components/Pagination/PaginationComponent";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import moment from "moment";

function Archive(props) {
    // const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
    const [modalExportisOpen, setModalExportisOpen] = useState(false);
    const [dataPerdata, setDataPerdata] = useState(null);

    const history = useHistory();

    // const toggleModalDel = () => {
    //     setModalDeleteIsOpen(!modalDeleteIsOpen);
    // };

    const toggleModalExport = () => {
        setModalExportisOpen(!modalExportisOpen);
    };

    const [findDataFilter, setFindDataFilter] = useState("");

    const [dateCodePick, setDateCodePick] = useState(null);

    const [startDate, setStartDate] = useState(null);
    const [formattedStartDate, setFormattedStartDate] = useState("");
    const [endDate, setEndDate] = useState(null);
    const [formattedEndDate, setFormattedEndDate] = useState("");

    const onChange = (dates) => {
        const [start, end] = dates;

        var formatStart = moment(start).format("yyyy-MM-DD").toString();
        var formatEnd = moment(end).format("yyyy-MM-DD").toString();

        setFormattedStartDate(formatStart);
        setFormattedEndDate(formatEnd);
        setStartDate(start);
        setEndDate(end);
    };

    const [totalItem, setTotalItem] = useState(0);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
    });

    const changePagePaginate = (page) => {
        setPagination({
            ...pagination,
            page: page,
        });
    };

    const getDtArsipPerdata = () => {
        var findData = findDataFilter === "" ? null : findDataFilter;
        var dateStart = startDate === "" ? null : formattedStartDate;
        var dateEnd = endDate === "" ? null : formattedEndDate;
        var dateCode = dateCodePick === null ? null : dateCodePick;

        var ofset =
            pagination.page === 1
                ? 0
                : (pagination.page - 1) * pagination.limit;

        GetArsipPerdata({
            query: findData,
            befor: dateStart,
            after: dateEnd,
            date_code: dateCode,
            offset: ofset,
            limit: pagination.limit,
        })
            .then((res) => {
                if (res.status === 200) {
                    setDataPerdata(res.data);
                    setTotalItem(res.total_item);
                }
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        debounceOnFilter();
    }, [pagination.page, findDataFilter, startDate, endDate, dateCodePick]);

    const debounceOnFilter = AwesomeDebouncePromise(getDtArsipPerdata, 700);
    const onClearFilter = () => {
        setDateCodePick(null);
        setStartDate("");
        setEndDate("");
    };

    const onClearSearch = () => {
        setFindDataFilter("");
    };

    return (
        <div className="c-main">
            {/* {modalDeleteIsOpen ? (
                <ModalDeleteArchive
                    modal={modalDeleteIsOpen}
                    toggle={toggleModalDel}
                />
            ) : null} */}

            {modalExportisOpen ? (
                <ModalExportArchive
                    modal={modalExportisOpen}
                    toggle={toggleModalExport}
                />
            ) : null}
            <div className="container-fluid custom-container-fluid fade show mb-5">
                <div className="wrapperArchive mb-20px">
                    <div className="headerArchive">
                        <button
                            className="btn-tambah mr-20px mb-10px"
                            onClick={() =>
                                props.history.push("./archive-perdata/tambah")
                            }
                        >
                            <AiOutlinePlusCircle size={20} color="white" />
                            <Gap width={5} />
                            Tambah Data
                        </button>
                        <div className="headerTools ">
                            <div className="wrapperInput mb-10px">
                                <FiSearch size={20} />
                                <Gap width={10} />
                                <input
                                    className="input"
                                    placeholder="Cari Data"
                                    onChange={(e) =>
                                        setFindDataFilter(e.target.value)
                                    }
                                    value={findDataFilter}
                                />
                                <Gap width={10} />
                                {findDataFilter !== "" ? (
                                    <IoMdClose
                                        color="red"
                                        size={20}
                                        onClick={onClearSearch}
                                    />
                                ) : null}
                            </div>
                            <div className="wrapperFilter-date  mb-10px ml-20px">
                                <RiCalendar2Line />
                                <DatePicker
                                    className="filter-date"
                                    monthsShown={2}
                                    selected={startDate}
                                    onChange={onChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    dateFormat="dd MMM"
                                    placeholderText={"1 Jan"}
                                    // inline
                                >
                                    <div className="date-code-container">
                                        <div
                                            onClick={() =>
                                                setDateCodePick("hi")
                                            }
                                            className="date-code"
                                            style={{
                                                backgroundColor:
                                                    dateCodePick === "hi"
                                                        ? "#8BA577"
                                                        : "#F0F0F0",
                                                color:
                                                    dateCodePick === "hi"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            Hari Ini
                                        </div>
                                        <div
                                            onClick={() =>
                                                setDateCodePick("km")
                                            }
                                            className="date-code"
                                            style={{
                                                backgroundColor:
                                                    dateCodePick === "km"
                                                        ? "#8BA577"
                                                        : "#F0F0F0",

                                                color:
                                                    dateCodePick === "km"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            Kemarin
                                        </div>
                                        <div
                                            onClick={() =>
                                                setDateCodePick("mi")
                                            }
                                            className="date-code"
                                            style={{
                                                backgroundColor:
                                                    dateCodePick === "mi"
                                                        ? "#8BA577"
                                                        : "#F0F0F0",

                                                color:
                                                    dateCodePick === "mi"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            Minggu Ini
                                        </div>
                                        <div
                                            className="date-code"
                                            onClick={() =>
                                                setDateCodePick("bi")
                                            }
                                            style={{
                                                backgroundColor:
                                                    dateCodePick === "bi"
                                                        ? "#8BA577"
                                                        : "#F0F0F0",

                                                color:
                                                    dateCodePick === "bi"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            Bulan Ini
                                        </div>
                                        <div
                                            onClick={() =>
                                                setDateCodePick("bl")
                                            }
                                            className="date-code"
                                            style={{
                                                backgroundColor:
                                                    dateCodePick === "bl"
                                                        ? "#8BA577"
                                                        : "#F0F0F0",
                                                color:
                                                    dateCodePick === "bl"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            Bulan Lalu
                                        </div>
                                        <div
                                            onClick={() =>
                                                setDateCodePick("ti")
                                            }
                                            className="date-code"
                                            style={{
                                                backgroundColor:
                                                    dateCodePick === "ti"
                                                        ? "#8BA577"
                                                        : "#F0F0F0",
                                                color:
                                                    dateCodePick === "ti"
                                                        ? "white"
                                                        : "black",
                                            }}
                                        >
                                            Tahun Ini
                                        </div>
                                    </div>
                                </DatePicker>
                                <div>-</div>
                                <DatePicker
                                    className="filter-date"
                                    monthsShown={2}
                                    selected={endDate}
                                    onChange={onChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    dateFormat="dd MMM"
                                    placeholderText="31 Des"
                                    // disabled
                                />
                                <IoMdClose
                                    color="red"
                                    size={20}
                                    onClick={onClearFilter}
                                />
                            </div>

                            <button className="print-btn  mb-10px ml-20px">
                                <FiLogOut
                                    size={20}
                                    style={{
                                        marginRight: "10px",
                                        marginTop: "-3px",
                                    }}
                                />
                                Export
                            </button>
                        </div>
                    </div>
                    <div></div>
                </div>

                <div className="c-table-main mb-30px">
                    <table className="table-main">
                        <thead className="table-main-thead">
                            <tr>
                                <th
                                    className="table-main-th"
                                    style={{ width: "5%" }}
                                >
                                    No.
                                </th>
                                <th
                                    className="table-main-th"
                                    style={{ width: "22%" }}
                                >
                                    No. Perkara
                                </th>
                                <th
                                    className="table-main-th"
                                    style={{ width: "8%" }}
                                >
                                    BOX
                                </th>
                                <th
                                    className="table-main-th"
                                    style={{ width: "22%" }}
                                >
                                    Nama Terdakwa
                                </th>
                                <th
                                    className="table-main-th"
                                    style={{ width: "17%" }}
                                >
                                    Tanggal Peringiriman
                                </th>
                                <th
                                    className="table-main-th"
                                    style={{ width: "13%" }}
                                >
                                    PDF
                                </th>
                                <th
                                    className="table-main-th"
                                    style={{ width: "13%" }}
                                >
                                    Edit
                                </th>
                            </tr>
                        </thead>

                        <tbody className="table-main-tbody">
                            {dataPerdata === null
                                ? null
                                : dataPerdata.map((dt, i) => (
                                      <tr
                                          key={i}
                                          className="table-main-nth-child"
                                      >
                                          <td className="table-main-td">
                                              {i + 1}
                                          </td>
                                          <td
                                              className="table-main-td"
                                              style={{ textAlign: "left" }}
                                          >
                                              {dt.no_perkara}
                                          </td>
                                          <td className="table-main-td">
                                              {dt.box}
                                          </td>
                                          <td className="table-main-td">
                                              {dt.nama_terdakwa}
                                          </td>
                                          <td className="table-main-td">
                                              {dt.tanggal_pengiriman}
                                          </td>
                                          <td className="table-main-td">
                                              <CgFileDocument
                                                  size={22}
                                                  style={{
                                                      cursor: "pointer",
                                                  }}
                                              />
                                          </td>
                                          <td className="table-main-td">
                                              <MdModeEdit
                                                  size={22}
                                                  style={{
                                                      cursor: "pointer",
                                                  }}
                                                  onClick={
                                                      () =>
                                                          history.push({
                                                              pathname:
                                                                  "/sys/archive-perdata/edit",
                                                              state: dt,
                                                          })
                                                      //   props.history.push(
                                                      //       "/sys/archive-perdata/edit"
                                                      //   )
                                                  }
                                              />
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>
                <PaginationComponent
                    totalItems={totalItem}
                    pageSize={pagination.limit}
                    onSelect={changePagePaginate}
                    activePage={pagination.page}
                    className="pagination justify-content-center mb-0"
                    listClassName="justify-content-center mb-0"
                />
            </div>
        </div>
    );
}

export default Archive;
