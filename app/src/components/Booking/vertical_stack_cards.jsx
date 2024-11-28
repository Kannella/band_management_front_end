import React from 'react';
import BookingCard from './card_booking';

const StackedCards = () => {
  return (
    <div className="container mt-2">
      <div
        className="stacked-cards-container"
        style={{
          maxHeight: '24vh',
          overflowY: 'auto', 
          paddingRight: '15px',
        }}
      >
        <BookingCard />
        <BookingCard />
        <BookingCard />
      </div>
    </div>
  );
};

export default StackedCards;
