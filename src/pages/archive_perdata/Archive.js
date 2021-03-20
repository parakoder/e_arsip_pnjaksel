/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Gap from "../../components/Gap";
import { FiSearch } from "react-icons/fi";
import { RiCalendar2Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import "../archive_pidana/archive.scss";
import { MdModeEdit } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import ModalDeleteArchive from "../../components/modal/ModalDeleteArchive";
import DatePicker from "react-datepicker";
import { GetArsipPerdata } from "../../configs/handler/ArsipHandler";
import { useHistory } from "react-router-dom";
import PaginationComponent from '../../components/Pagination/PaginationComponent'
import AwesomeDebouncePromise from 'awesome-debounce-promise';

function Archive(props) {
    // const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

    const [dataPerdata, setDataPerdata] = useState(null);

    const history = useHistory();

    // const toggleModalDel = () => {
    //     setModalDeleteIsOpen(!modalDeleteIsOpen);
    // };

    const [findDataFilter, setFindDataFilter] = useState(null)

    const [dateCodePick, setDateCodePick] = useState(null)

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const [pagination, setPagination] = useState({
		page: 1,
		limit: 20,
	})

	const changePagePaginate = page => {
		setPagination({
			...pagination,
			page: page
		})
	}


    const getDtArsipPerdata = () => {

        var findData = findDataFilter === null ? null : findDataFilter
        var dateStart = startDate === null ? null : startDate
        var dateEnd = endDate === null ? null : endDate
        var dateCode = dateCodePick === null ? null : dateCodePick

        var ofset  = pagination.page === 1 ? 0 : ((pagination.page - 1) * pagination.limit)

        GetArsipPerdata({
            query: findData,
            befor: dateStart,
            after: dateEnd,
            date_code: dateCode,
            offset: ofset,
            limit: pagination.limit
        })
        .then((res) => {
            if (res.status === 200) {
                setDataPerdata(res.data);
            }
            // console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        debounceOnFilter()
    }, [pagination.page, findDataFilter, startDate, endDate, dateCodePick ]);


    const debounceOnFilter = AwesomeDebouncePromise(getDtArsipPerdata, 700);


    return (
        <div className="c-main">
            {/* {modalDeleteIsOpen ? (
                <ModalDeleteArchive
                    modal={modalDeleteIsOpen}
                    toggle={toggleModalDel}
                />
            ) : null} */}
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
                                    onChange={(e) => setFindDataFilter(e.target.value)}
                                />
                            </div>
                            <div className="wrapperFilter-date  mb-10px ml-20px">
                                <RiCalendar2Line
                                    style={{
                                        position: "absolute",
                                        zIndex: "2",
                                        margin: "10px 0px 0px 10px",
                                    }}
                                />
                                <DatePicker
                                    className="filter-date"
                                    monthsShown={2}
                                    selected={startDate}
                                    onChange={onChange}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    // inline
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
					totalItems={
						86
					}
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
