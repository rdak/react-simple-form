import React, { Component } from "react";
import { CARD_SIZE, CODE_SIZE } from "../constants";
import { ICard } from "../interfaces";
import { formatCard, delay } from "../util";

interface IFormProps {
  onSuccess: (card: ICard) => void;
}

interface IFormState {
  id: number;
  value: number;
  cardValue: string;
  codeValue: string;
}

/**
 * Main Component
 */
export class Form extends Component<IFormProps, IFormState> {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      value: 12.34,

      cardValue: "",
      codeValue: "",
    }

    this.onChangeCard = this.onChangeCard.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public idMaker() {
    this.setState({
      ...this.state,
      // add id from back-end
      id: this.state.id + 1,

      // add discount
      value: this.state.value + Math.round(Math.random() * 100) / 100,
    })
  }

  public onChangeCard(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value.replace(/ /g, "");

    if (value.length <= CARD_SIZE && !/\D/.test(value)) {
      this.setState({
        cardValue: value.replace(/ /g, ""),
      });
    }
  }

  public onChangeCode(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    if (value.length <= CODE_SIZE) {
      this.setState({
        codeValue: value,
      });
    }
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const card = {
      id: this.state.id,
      value: this.state.value,
      cardValue: this.state.cardValue,
      codeValue: this.state.codeValue,
    };

    if (this.validation(card)) {
      this.idMaker();

      delay(1000).then(() => {
        this.props.onSuccess(card);
        this.setState({
          ...this.state,
          cardValue: "",
          codeValue: ""
        })
      });
    }
  }

  public validation(card: ICard) {
    return card.cardValue.length === CARD_SIZE && card.codeValue.length === CODE_SIZE;
  }

  public render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >

        <div className="form__row">
          <input
            className="form__row-input form__row-input--long"
            placeholder="Gift Card Number"
            value={formatCard(this.state.cardValue)}
            onChange={this.onChangeCard}
          />

          <input
            className="form__row-input form__row-input--small"
            placeholder="Control Code"
            value={this.state.codeValue}
            onChange={this.onChangeCode}
          />
        </div>

        <div className="form__row">
          <button type="submit">Apply</button>
        </div>

      </form>
    );
  }

}
