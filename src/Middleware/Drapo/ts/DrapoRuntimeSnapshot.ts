interface DrapoRuntimeSnapshot {
    state: DrapoRuntimeState;
    sectors: string[];
    dataKeysBySector: { [sector: string]: string[] };
    diagnostics: DrapoDiagnosticEntry[];
}
