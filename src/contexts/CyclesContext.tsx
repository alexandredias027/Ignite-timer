import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateFormData {
    task: string;
    minutesAmount: number;
}

interface Cycle {

    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextData {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinish: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateFormData) => void;
    interromperCycle: () => void;

}

export const CyclesContext = createContext({} as CyclesContextData);

interface CyclesContextProviderProps {
    children: ReactNode;
}

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
    amountSecondsPassed: number;
}

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {

        switch (action.type) {
            case 'ADD_NEW_CYCLE':
                return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id,
                };
            case 'INTERRUPT_CURRENT_CYCLE':
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === action.payload.activeCycleId) {
                            return {
                                ...cycle,
                                interruptedDate: new Date(),
                            }
                        } else {
                            return cycle;
                        }
                    }),
                    activeCycleId: null,
                };
            case 'MARK_CURRENT_CYCLE_AS_FINISHED':
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === action.payload.activeCycleId) {
                            return {
                                ...cycle,
                                finishedDate: new Date(),
                            }
                        } else {
                            return cycle;
                        }
                    }),
                    activeCycleId: null,
                };
            default:
                return state;
        }

    }, {
        cycles: [],
        activeCycleId: null,
        amountSecondsPassed: 0,
    }
    )

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinish() {

        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId
            },
        });
    }

    function createNewCycle(data: CreateFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle
            },
        });

        setAmountSecondsPassed(0);
    }

    function interromperCycle() {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId
            },
        });
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinish,
                setSecondsPassed,
                createNewCycle,
                interromperCycle

            }}>

            {children}

        </CyclesContext.Provider>
    )

}