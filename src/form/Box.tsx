import React, { Component } from "react";
import { Form } from "./Form";
import { ICard } from "../interfaces";
import { hiddenCard, formatCard } from "../util";

interface IBoxProps {
  title: string;
  question: string;
}

interface IBoxState {
  isChecked: boolean;
  cardList: ICard[];
}

/**
 * Main Component
 */
export class Box extends Component<IBoxProps, IBoxState> {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      cardList: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  public onChange(e: React.FormEvent<HTMLInputElement>) {

    this.setState(
      {
        ...this.state,
        isChecked: !this.state.isChecked,
      }
    );

  }

  public onSuccess(card: ICard) {
    this.setState({
      ...this.state,
      cardList: [...this.state.cardList, card]
    });
  }

  public render() {
    const {
      title,
      question
    } = this.props;

    return (
      <div className="box">
        <h2 className="box__title">{title}</h2>

        <label className="box__label">
          <input
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.onChange}
          /> {question}
        </label>

        {
          this.state.isChecked &&
          <p className="box__hint">Please enter the 19-digit number and code from your gift card below.</p>
        }

        {
          this.state.cardList.map( (card) => {
            return (
              <div
                key={card.id}
                className="card"
              >
                <div className="card__info">
                  <div className="card__title">
                    Gift Card
                  </div>
                  <div className="card__number">
                    {hiddenCard(card.cardValue)}
                  </div>
                </div>

                <div className="card__value">
                  -${card.value}
                </div>
              </div>
            )
          })
        }

        {
          this.state.isChecked &&
          <Form
            onSuccess={this.onSuccess}
          />
        }
      </div>
    );
  }

}
