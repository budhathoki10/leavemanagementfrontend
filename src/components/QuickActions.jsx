import React from "react";
import styled from "styled-components";

const QuickActions = () => {
  return (
    <QuickActionsCard>
      <p className="quick-actions-card-label">Quick Actions</p>
      <ActionsGrid>
        <QuickActionCard>
          <div className="quick-actions">
            <span className="material-symbols-outlined">edit_document</span>
            <p className="quick-actions-label">Apply for Leave</p>
          </div>
        </QuickActionCard>

        <QuickActionCard>
          <div className="quick-actions">
            <span className="material-symbols-outlined">history</span>
            <p className="quick-actions-label">Leave History</p>
          </div>
        </QuickActionCard>

        <QuickActionCard>
          <div className="quick-actions">
            <span className="material-symbols-outlined">calendar_today</span>
            <p className="quick-actions-label">View Calendar</p>
          </div>
        </QuickActionCard>
      </ActionsGrid>
    </QuickActionsCard>
  );
};

export default QuickActions;

const QuickActionsCard = styled.div`
  min-width: 250px;
  margin: 30px 20px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  .quick-actions-card-label {
    font-size: 22px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #333;
  }

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const QuickActionCard = styled.div`
  .quick-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .quick-actions:hover {
    cursor: pointer;
    background: #f5f7fa;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .quick-actions span {
    font-size: 28px;
    padding: 8px;
    border-radius: 50%;
    background: #f0f2f5;
    color: #555;
  }

  .quick-actions-label {
    font-size: 16px;
    color: #444;
    font-weight: 500;
  }
`;
