"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

const ReportSoldOutContext = createContext<(() => void) | null>(null);

/**
 * Troca a página pública inteira pela mensagem de convites esgotados.
 *
 * O estado nasce de `initialSoldOut` e depois só muda quando o envio informa que
 * não há mais vaga. Assim, a revalidação feita após uma confirmação que ocupa a
 * última vaga mantém a ficha e o alerta de sucesso na tela.
 */
export function SoldOutBoundary({
  initialSoldOut,
  soldOutMessage,
  children,
}: {
  initialSoldOut: boolean;
  soldOutMessage: ReactNode;
  children: ReactNode;
}) {
  const [isSoldOut, setIsSoldOut] = useState(initialSoldOut);
  const reportSoldOut = useCallback(() => setIsSoldOut(true), []);

  if (isSoldOut) {
    return soldOutMessage;
  }

  return (
    <ReportSoldOutContext.Provider value={reportSoldOut}>
      {children}
    </ReportSoldOutContext.Provider>
  );
}

/** Avisa a página que o envio encontrou o evento sem vagas. */
export function useReportSoldOut() {
  const reportSoldOut = useContext(ReportSoldOutContext);

  if (!reportSoldOut) {
    throw new Error("useReportSoldOut precisa estar dentro de SoldOutBoundary.");
  }

  return reportSoldOut;
}
