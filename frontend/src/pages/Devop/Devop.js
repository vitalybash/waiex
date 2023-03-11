import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import DevopsService from "../../API/DevopsService";
import ServicesService from "../../API/ServicesService";
import "./Devop.css";
import { createName } from "../../utils/userNameCreater";
import Carousel from "../../components/Carousel/Carousel";
import Card from "../../components/Card/Card";
import ReviewsService from "../../API/ReviewsService";
import Review from "../../components/Review/Review";

const Devop = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setUser(DevopsService.getById(params.id));
    setServices(ServicesService.getByUserId(params.id));
    setReviews(ReviewsService.getByDevopId(params.id));
  }, []);

  return (
    Object.keys(user).length !== 0
        ?
          <div className="devop">
            <img className="profile-image" src={require("../../assets/" + user?.image)} />
            <div className="user-info">
              <div>
                <h2>{createName(user)}</h2>
                <p>{user.description}</p>
              </div>
              <img src={require("../../assets/" + user?.logo)} />
            </div>
            <section>
              <h3>Услуги:</h3>
              <div>
                <Carousel
                  elements={services}
                  elementReturner={(data) => {
                    return <Card key={data.id} service={data.element} />;
                  }}
                  elementWidth={500}
                />
              </div>
            </section>
            <section>
              <h3>Отзывы:</h3>
              <div>
                <Carousel
                  elements={reviews}
                  elementReturner={(data) => {
                    return <Review key={data.id} review={data.element} />;
                  }}
                  elementWidth={500}
                />
              </div>
            </section>
          </div>
      : <h1>LOADING...</h1>
  );
};

export default Devop;