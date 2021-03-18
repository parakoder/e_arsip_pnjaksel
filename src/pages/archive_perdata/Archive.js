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

function Archive(props) {
    // const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

    const [dataPerdata, setDataPerdata] = useState(null);

    const history = useHistory();

    useEffect(() => {
        GetArsipPerdata()
            .then((res) => {
                if (res.status === 200) {
                    setDataPerdata(res.data);
                }
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {
            // cleanup
        };
    }, []);

    // const toggleModalDel = () => {
    //     setModalDeleteIsOpen(!modalDeleteIsOpen);
    // };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

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

                <div className="c-table-main">
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
            </div>
        </div>
    );
}

export default Archive;
