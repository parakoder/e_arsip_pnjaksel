import React, {
    useState,
    // useEffect
} from 'react'
import '../styles/checkFirstLoginPage.scss'
import {
    RiLockLine, RiLockUnlockLine
} from "react-icons/ri";


function CheckFirstLogin(props) {

    const [isSuccess, setIsSuccess] = useState(false)



    return (
        <div className='c-main'>
            <div className='container-fluid custom-container-fluid fade show mb-5'>
                <div className="container wrapper-page-check-first-login">
                    {isSuccess === false ?
                        <RiLockLine
                            className="lock-img mb-50px"
                            size={50}
                        />
                        :
                        <RiLockUnlockLine 
                            className="lock-img mb-50px"
                            size={50}
                        />
                    }
                    
                    <p className="txt-1 mb-20px">Anda Belum bisa mengakses e-Arsip Dashboard</p>
                   
                    <p className="txt-2 mb-50px"> 
                        Akun Anda masih belum diperbolehkan mengakses Dashboard secara menyeluruh,
                        segera ubah Kata Sandi untuk dapat mengakses e-Arsip. Kata Sandi tersebut nantinya adalah Kata
                        Sandi yang akan Anda gunakan untuk Login ke e-Arsip.
                    </p>
                    
                    <div className="form-input ">
                        {isSuccess === false ?
                            <>
                                <div className="form-input-group mb-20px">
                                    <label className="text-input-title-2 mb-10px">
                                        Kata Sandi Baru
                            </label>
                                    <input
                                        className="form-input-2"
                                    />
                                </div>
                                <div className="form-input-group mb-50px">
                                    <label className="text-input-title-2 mb-10px">
                                        Ulangi Kata Sandi Baru
                            </label>
                                    <input
                                        className="form-input-2"
                                    />
                                </div>
                        
                                <button className="btn-action"
                                    onClick={() => setIsSuccess(!isSuccess)}
                                >
                                    Ubah Kata sandi
                                </button>
                            </>
                            :
                            <button className="btn-action mt-120px "
                                onClick={() => props.history.push('/sys/home')}
                            >
                                Akses Dashboard Sekarang
                            </button>
                        }

                        </div>
                   
                </div>
            </div>
        </div>
    )
}

export default CheckFirstLogin
