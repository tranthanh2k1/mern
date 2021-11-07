import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='wp__footer'>
            <div className="container">
                <div className="wp__footer-content">
                    <div className='wp__footer-item'>
                        <p>
                            <img src="https://storage.googleapis.com/cdn.nhanh.vn/website/template/538/contentKey/961/yody%201.png" alt="logo footer" />
                        </p>
                        <p>"Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ và hành động của mình" là sứ mệnh, là triết lý, chiến lược.. luôn cùng YODY tiến bước.</p>
                        <div className="footer__title">TỔNG ĐÀI GỌI HỖ TRỢ</div>
                        <div className="footer-contact">
                            <p>Liên hệ đặt hàng: 024 730 56665</p>
                            <p>Thắc mắc đơn hàng: 024 730 16661</p>
                            <p>Góp ý, khiếu nại: 1800 2086 (Miễn phí)</p>
                        </div>
                    </div>
                    <div className='wp__footer-item'>
                        <div className="footer__title">VỀ YODY</div>
                        <ul>
                            <li><Link to="#">Giới thiệu</Link></li>
                            <li><Link to="#">Liên hệ</Link></li>
                            <li><Link to="#">Tuyển dụng</Link></li>
                            <li><Link to="#">Tin tức</Link></li>
                            <li><Link to="#">Hệ thống cửa hàng</Link></li>
                            <li>
                                <Link to="#">
                                    <img className='footer__icon-logo' src="https://yody.vn/img/dathongbaobocongthuong.png" alt="footer info" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='wp__footer-item'>
                        <div className="footer__title">HỖ TRỢ KHÁCH HÀNG</div>
                        <ul>
                            <li><Link to="#">Hướng dẫn chọn size</Link></li>
                            <li><Link to="#">Chính sách khách hàng thân thiết</Link></li>
                            <li><Link to="#">Chính sách đổi/trả</Link></li>
                            <li><Link to="#">Chính sách bảo mật</Link></li>
                            <li><Link to="#">Thanh toán, giao nhận</Link></li>
                            <li><Link to="#">Affiliate</Link></li>
                        </ul>
                    </div>
                    <div className='wp__footer-item'>
                        <div className="footer__title">CÔNG TY CP THỜI TRANG YODY</div>
                        <p>Văn phòng: Công ty YODY, Đường An Định, TP.Hải Dương (Dưới chân cầu Đồng Niên)</p>
                        <p>MST: 0801206940</p>
                        <p>Email: chamsockhachhang@yody.vn</p>
                        <div className="footer__title">KẾT NỐI VỚI CHÚNG TÔI</div>
                        <ul className='footer__social-network'>
                            <li>
                                <Link to="#">
                                    <img src="https://yody.vn/tp/T0110/img/tmp/icon/fb_logo.png" alt="icon facebook" />
                                </Link>
                            </li>
                            <li><Link to="#">
                                <img src="https://yody.vn/tp/T0110/img/tmp/icon/ytb_logo.png" alt="icon youtube" />
                            </Link></li>
                            <li>
                                <Link to="#">
                                    <img src="https://yody.vn/tp/T0110/img/tmp/icon/insta_logo.png" alt="icon instagram" />
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src="https://yody.vn/tp/T0110/img/tmp/icon/zalo_logo.png" alt="icon zalo" />
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src="https://yody.vn/tp/T0110/img/tmp/icon/shoppe.png" alt="icon shoppe" />
                                </Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <img src="https://yody.vn/tp/T0110/img/tmp/icon/lazada.png" alt="icon lazada" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <img className='icon__zalo-flex' src="https://yody.vn/tp/T0110/img/tmp/stick_zalo.png" alt="icon zalo flex" />
        </div >
    )
}

export default Footer
