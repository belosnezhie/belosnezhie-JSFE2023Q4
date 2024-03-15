// import { data } from '../../services/dataServices/Data';
// import { SentenceData } from '../../services/dataServices/DataInterfaces';
import { BasicComponent } from '../BasicComponent';

// import { currentMoveCardEvent } from './MoveCardEvent';
import { ResultSentence } from './ResultSentence';

// import { MoveCardEvent } from './MoveCardEvent';

export class ResultField extends BasicComponent {
  // private rounds: SentenceData[];
  // private sentenceFieldCount: number;
  constructor(resultSentence: ResultSentence) {
    super({
      tag: 'div',
      className: 'result_field',
    });

    this.append(resultSentence);

    // this.sentenceFieldCount = data.getCurrentRoundsCount();

    // this.rounds = data.getCurrentRounds();

    // this.children = this.rounds.forEach(() => {
    //   const resultSentenceField = new ResultSentence(currentMoveCardEvent);

    //   return resultSentenceField;
    // });
  }

  public changeRound() {
    this.removeChildren();
    this.clearChildrenArr();
  }
}
