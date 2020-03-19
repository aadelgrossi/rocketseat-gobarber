import React, { useState, useMemo } from 'react';

import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Container, Appointment } from './styles';

export default function Dashboard() {
  const name = 'Andre Grossi';
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        <Appointment past>
          <strong>08:00</strong>
          <span>{name}</span>
        </Appointment>
        <Appointment available>
          <strong>09:00</strong>
          <span>{name}</span>
        </Appointment>
        <Appointment>
          <strong>10:00</strong>
          <span>{name}</span>
        </Appointment>
        <Appointment>
          <strong>11:00</strong>
          <span>{name}</span>
        </Appointment>
      </ul>
    </Container>
  );
}
