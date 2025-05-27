'use client'

import { useState } from 'react';
import PropTypes from 'prop-types';

const MortgagePrograms = ({ 
  calculatorLink, 
  secondLink, 
  secondIcon,
  secondText,
  programs
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mortgage-right">
      <div className="tabs">
        {programs.map((program, index) => (
          <button 
            key={index}
            className={`tab ${activeTab === index ? 'active all-project-div' : 'button-purple'}`}
            onClick={() => setActiveTab(index)}
          >
            <span>{program.title.toLowerCase()}</span>
          </button>
        ))}
      </div>
      
      <h3 className="program-title">{programs[activeTab].title}</h3>
      
      <div className="program-card" itemScope itemType="https://schema.org/LoanOrCredit">
        <meta itemProp="name" content={programs[activeTab].name} />
        <meta itemProp="description" content={programs[activeTab].description} />
        
        <div className="program-info">
          <div>
            <span className="label-top">Диапазон ПСК</span>
            <span className="value" itemProp="annualPercentageRate">{programs[activeTab].pskRange}</span>
          </div>
          <div>
            <span className="label-top">Ставка</span>
            <span className="value" itemProp="interestRate">{programs[activeTab].rate}</span>
          </div>
          <div>
            <span className="label-top">Сумма</span>
            <span className="value" itemProp="amount">{programs[activeTab].amount}</span>
          </div>
          <div>
            <span className="label-top">Взнос</span>
            <span className="value" itemProp="downPayment">{programs[activeTab].payment}</span>
          </div>
          <div className="full-width">
            <span className="label-top">Срок кредита</span>
            <span className="value" itemProp="loanTerm">{programs[activeTab].term}</span>
          </div>
        </div>

        <div className="buttons">
          <a href={calculatorLink} className="btn button-purple">
            <span>Калькулятор</span>
          </a>
          <a href={secondLink} className="btn all-project-div">
            <span>
              <img src={secondIcon} alt="" className="btn-icon" />
              {secondText}
            </span>
          </a>
        </div>
      </div>

      <p className="program-card-text">* Пожалуйста, обратите внимание, что процентные ставки и условия могут варьироваться в зависимости от региона, суммы кредита, наличия страхования и других факторов. Рекомендуется обратиться в банк для получения персонализированной консультации и уточнения условий.</p>
    </div>
  );
};

MortgagePrograms.propTypes = {
  calculatorLink: PropTypes.string.isRequired,
  domclickLink: PropTypes.string.isRequired,
  domclickIcon: PropTypes.string.isRequired
};

export default MortgagePrograms;