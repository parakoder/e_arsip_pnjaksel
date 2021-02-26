import React from 'react'
import '../../pages/log/log.scss'

function FilterAdmin(props) {

    return (
        <div className="wrapper-log-find-admin">
            <div className='c-filter-admin'>
                <input className="input"
                    placeholder="Cari Nama Admin"
                />
            </div>

            <div className="c-checker-admin">
                <div className="checker-select-all">
                    <input type="checkbox" />  Semua Admin
                </div>
                <div className="c-checker-select-list">
                    {props.listAdmin ? props.listAdmin.map((dt, i) => (
                        <div className="checker-select-list">
                            <input type="checkbox" />
                            <span>{dt.name}</span>
                        </div>
                    ))
                        : null
                    }
                </div>
            </div>
            
        </div>
    )
}

export default FilterAdmin
