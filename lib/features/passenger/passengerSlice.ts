import { createAppSlice } from "@/lib/createAppSlice";

export type PassengerCategory = "adult" | "child" | "infant";
interface PassengerDetails {
  category: PassengerCategory;
  name: string;
  dateOfBirth: string;
  frequentFlyerNumber?: string;
}
export interface Baggage {
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
  errorMessage?: string;
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
    addPassengerAndValidate: create.asyncThunk(async (_, { dispatch }) => {
      dispatch(addPassenger());
      dispatch(validateDetails());
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
      },
    ),
    validateDetails: create.reducer((state) => {
      const containsPassengerWithShortName = state.passengers.some(
        (passenger) => passenger.details.name.length < 3,
      );
      if (containsPassengerWithShortName) {
        state.errorMessage =
          "Passenger names must be at least 3 characters long";
      } else {
        state.errorMessage = "";
      }
    }),
    updatePassengerAndValidate: create.asyncThunk(
      async (
        { index, passenger }: { index: number; passenger: PassengerDetails },
        { dispatch },
      ) => {
        dispatch(updatePassenger({ index, passenger }));
        dispatch(validateDetails());
      },
    ),
  }),
  selectors: {
    selectPassengers: (state) => state.passengers,
    selectPassengerCount: (state) => state.passengers.length,
    selectPassenger: (state, index: number) => state.passengers[index],
    selectPassengerDetails: (state, index: number) =>
      state.passengers[index].details,
    selectErrorMessage: (state) => state.errorMessage,
  },
});

export const {
  addPassenger,
  removePassenger,
  updatePassenger,
  updateBaggage,
  validateDetails,
  updatePassengerAndValidate,
  addPassengerAndValidate,
} = passengerSlice.actions;
export const {
  selectPassengers,
  selectPassengerCount,
  selectPassenger,
  selectPassengerDetails,
  selectErrorMessage,
} = passengerSlice.selectors;
