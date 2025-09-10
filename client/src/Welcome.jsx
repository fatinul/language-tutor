import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();
  const scenarios = [
    {
      title: 'Buying something at the CU mart',
      scenario: 'buying-something-at-the-cu-mart',
    },
    {
      title: 'Talking with a lecturer',
      scenario: 'talking-with-a-lecturer',
    },
    {
      title: 'Conversation with a group mate',
      scenario: 'conversation-with-a-group-mate',
    },
  ];

  const handleScenarioSelected = (scenario) => {
    navigate(`/chat?scenario=${scenario}`);
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Language Tutor</h1>
      <p>Choose a scenario to start practicing:</p>
      <div className="scenarios">
        {scenarios.map((scenario, index) => (
          <button key={index} onClick={() => handleScenarioSelected(scenario.scenario)}>
            {scenario.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Welcome;