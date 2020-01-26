import { Component, EventEmitter, Output } from "@angular/core";
// import { EventBus } from "../../../../site/event-bus/event-bus.js";
// declare const EventBus: any;

@Component({
  // selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private _numTimesCustButtonClicked = 0;
  @Output() custButtonClicked = new EventEmitter<number>();
  private _siteRootAgent: Element;

  // public eventBus: EventBus;

  // constructor(eventBus: EventBus) {
  //   this.eventBus = eventBus;
  // }

  constructor() {
    this._siteRootAgent = document.querySelector("site-root-agent");
    console.log("CustButtonClicker._siteRootAgent: ", this._siteRootAgent);
  }

  onCustButtonClicked(): void {
    this._numTimesCustButtonClicked++;
    console.log("_numTimesCustButtonClicked", this._numTimesCustButtonClicked);

    // Emit a normal Angular event
    this.custButtonClicked.emit(this._numTimesCustButtonClicked);

    // Emit a custom event
    const data = {
      numTimesCustButtonClicked: this._numTimesCustButtonClicked
    };
    const event = new CustomEvent("custButtonClickedCustomEvent", {
      detail: data
    });
    window.dispatchEvent(event);

    // Emit an site EventBus event
    // @ts-ignore
    window.EventBus.fire("custButtonClickedCustomEventFromBusListener", {
      numTimesCustButtonClicked: this._numTimesCustButtonClicked
    });

    if (this._siteRootAgent) {
      // @ts-ignore
      this._siteRootAgent.postMessageToConsole(
        "Foo you from CustButtonClicker!"
      );

      // @ts-ignore
      this._siteRootAgent.fauxHttpRequest(
        "FRUIT",
        this.fauxHttpRequestListener
      );
    }
  }

  public fauxHttpRequestListener(fauxHttpResponse: Array<Object>) {
    console.log("fauxHttpResponse: ", fauxHttpResponse);
  }
}
