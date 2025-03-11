import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { cyclesReducer } from "../cycles/reducer";
import { Cycle } from "../interfaces/CyclesInterface";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateFormData {
    task: string;
    minutesAmount: number;
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

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null,
        amountSecondsPassed: 0,
    }, (initialState) => {
        const storagedState = localStorage.getItem('@ignite-timer:cycles-state');

        if (storagedState) {
            return JSON.parse(storagedState);
        }

        return initialState

    })

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            );
        }

        return 0;
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);
        localStorage.setItem('@ignite-timer:cycles-state', stateJSON);


    }, [cyclesState])



    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinish() {
        dispatch(markCurrentCycleAsFinishedAction());
    }

    function createNewCycle(data: CreateFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch(
            addNewCycleAction(newCycle)
        );

        setAmountSecondsPassed(0);
    }

    function interromperCycle() {
        dispatch(interruptCurrentCycleAction());
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