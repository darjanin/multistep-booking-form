import { createAppSlice } from "@/lib/createAppSlice";

type PassengerCategory = "adult" | "child" | "infant";
interface PassengerDetails {
  category: PassengerCategory;
  name: string;
  dateOfBirth: string;
  frequentFlyerNumber?: string;
}
interface Baggage {
  cabin: boolean;
  checked: boolean;
}
interface Passenger {
  details: PassengerDetails;
  services: {
    baggage: Baggage;
  };
}

export interface PassengerSlice {
  passengers: Passenger[];
}

const newEmptyPassenger: Passenger = {
  details: {
    name: "",
    category: "adult",
    dateOfBirth: "",
  },

  services: {
    baggage: {
      cabin: false,
      checked: false,
    },
  },
};

const initialStateDev = [
  {
    details: {
      category: "adult",
      name: "Alice",
      dateOfBirth: "1992-02-02",
      frequentFlyerNumber: "",
    },
    services: {
      baggage: {
        cabin: false,
        checked: false,
      },
    },
  },
  {
    details: {
      category: "adult",
      name: "Bob",
      dateOfBirth: "1992-01-05",
      frequentFlyerNumber: "HelloKIWI",
    },
    services: {
      baggage: {
        cabin: true,
        checked: false,
      },
    },
  },
  {
    details: {
      category: "child",
      name: "John",
      dateOfBirth: "2020-12-15",
      frequentFlyerNumber: "",
    },
    services: {
      baggage: {
        cabin: false,
        checked: true,
      },
    },
  },
  {
    details: {
      category: "infant",
      name: "David",
      dateOfBirth: "2024-04-12",
      frequentFlyerNumber: "",
    },
    services: {
      baggage: {
        cabin: false,
        checked: false,
      },
    },
  },
] as Passenger[];

const initialState: PassengerSlice = {
  passengers: initialStateDev,
};

export const passengerSlice = createAppSlice({
  name: "passenger",
  initialState,
  reducers: (create) => ({
    addPassenger: create.reducer((state) => {
      state.passengers.push(newEmptyPassenger);
    }),
    removePassenger: create.reducer((state) => {
      state.passengers.pop();
    }),
    updatePassenger: create.reducer<{
      index: number;
      passenger: PassengerDetails;
    }>((state, action) => {
      state.passengers[action.payload.index].details = action.payload.passenger;
    }),
    updateBaggage: create.reducer<{ index: number; baggage: Baggage }>(
      (state, action) => {
        state.passengers[action.payload.index].services.baggage =
          action.payload.baggage;
      }
    ),
  }),
  selectors: {
    selectPassengers: (state) => state.passengers,
    selectPassenger: (state, index: number) => state.passengers[index],
    selectPassengerDetails: (state, index: number) =>
      state.passengers[index].details,
  },
});

export const { addPassenger, removePassenger, updatePassenger, updateBaggage } =
  passengerSlice.actions;
export const { selectPassengers, selectPassenger, selectPassengerDetails } =
  passengerSlice.selectors;
