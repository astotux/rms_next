'use client'

import { useState } from 'react';
import PropTypes from 'prop-types';

const MortgagePrograms = ({ 
  calculatorLink, 
  secondLink, 
  secondIcon,
  secondText,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const programs = [
    {
      name: "Семейная ипотека",
      title: "Семейная",
      description: "Ипотечная программа для семей с детьми",
      pskRange: "6,298–23,142%",
      rate: "от 6%",
      amount: "до 30 млн ₽",
      payment: "от 20,1%",
      term: "до 30 лет"
    },
    {
      name: "Ипотека для IT",
      title: "Для IT",
      description: "Льготная программа для IT-специалистов",
      pskRange: "5,500–21,000%",
      rate: "от 5%",
      amount: "до 25 млн ₽",
      payment: "от 15%",
      term: "до 25 лет"
    },
    {
      name: "Ипотека с мат. капиталом",
      title: "С мат. капиталом",
      description: "Программа с использованием материнского капитала",
      pskRange: "6,000–22,500%",
      rate: "от 6,5%",
      amount: "до 20 млн ₽",
      payment: "от 10%",
      term: "до 30 лет"
    }
  ];

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
            <span className="label">Диапазон ПСК</span>
            <span className="value" itemProp="annualPercentageRate">{programs[activeTab].pskRange}</span>
          </div>
          <div>
            <span className="label">Ставка</span>
            <span className="value" itemProp="interestRate">{programs[activeTab].rate}</span>
          </div>
          <div>
            <span className="label">Сумма</span>
            <span className="value" itemProp="amount">{programs[activeTab].amount}</span>
          </div>
          <div>
            <span className="label">Взнос</span>
            <span className="value" itemProp="downPayment">{programs[activeTab].payment}</span>
          </div>
          <div className="full-width">
            <span className="label">Срок кредита</span>
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
    </div>
  );
};

MortgagePrograms.propTypes = {
  calculatorLink: PropTypes.string.isRequired,
  domclickLink: PropTypes.string.isRequired,
  domclickIcon: PropTypes.string.isRequired
};

export default MortgagePrograms;