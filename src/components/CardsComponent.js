import React from 'react';
import '../styles/RepositoryDetailsPage.css';

const CardsComponent = ({ props }) => {
  const {
    id,
    name,
    forks,
    stars,
    watchers,
    ownerName,
    ownerAvatar,
    openIssues,
    contributors,
    languages,
    topics,
  } = props;
  return (
    <>
      <div className='container-card'>
        <div className='card'>
          <div className='card-image'>
            {' '}
            <img src={ownerAvatar} />
          </div>
          <div className='card-name'>Owner : {ownerName}</div>
          <div className='card-position'>Stars : {stars}</div>
          <div className='card-position'>Forks : {forks}</div>
          <div className='card-position'>Issues : {openIssues}</div>
          <div className='card-position'>Watchers : {watchers}</div>
        </div>
        <div className='card'>
          <div className='card-name'>Languages :</div>
          {languages?.map((language) => (
            <div className='card-position' key={language.languageName}>
              {' '}
              <div>{language.languageName}</div>
              <progress value={language.usagePercent} max='100'></progress>
              {language.usagePercent < 0.01 ? '<0.01' : language.usagePercent} %
            </div>
          ))}
        </div>
        <div className='card'>
          <div className='card-name'>Contributors :</div>
          <ul>
            {contributors?.map((contributor, index) => (
              <li key={index}>
                <div className='card-position'>{contributor}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className='card'>
          <div className='card-name'>Topics :</div>
          {topics?.map((topic, index) => (
            <div className='card-position' key={index}>{topic}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardsComponent;
