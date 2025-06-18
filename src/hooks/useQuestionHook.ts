import { useAppSelector } from "src/redux/hooks";

export const useQuestionHook = () => {
  const question = useAppSelector((store) => store.question);
  return {
    vehicleType:question.vehicleType,
    carTypesdatas: question.carTypesST,
    budgets: question.budgetST,
    leaseORbuy: question.leasOrbuyST,
    newORpre: question.newOrPreST,
    tradeIN: question.tradeINST,
    colorsData: question.colorsST,
  };
};
