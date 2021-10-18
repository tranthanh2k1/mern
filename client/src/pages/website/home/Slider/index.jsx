import React from 'react'

const Slider = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://storage.googleapis.com/cdn.nhanh.vn/store/3138/bn/ra%20mat%20ao%20gio%20web.png" className="d-block w-100" alt="ảnh slider" />
                </div>
                <div className="carousel-item">
                    <img src="https://storage.googleapis.com/cdn.nhanh.vn/store/3138/bn/POLO-249K%201920x650.png" className="d-block w-100" alt="ảnh slider" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Slider
