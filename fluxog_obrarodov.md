### Fluxograma da Sequência Construtiva de Obras Rodoviárias

```mermaid
graph TD
    A[INÍCIO] --> B("FASE I: PRÉ-CONSTRUÇÃO <br> (PROJETO E PLANEJAMENTO)");
    
    subgraph B
        B1("1. Estudos Preliminares e Definitivos <br> • Tráfego (Número N) <br> • Topográficos e Geométricos (Traçado) <br> • Geológicos e Geotécnicos (Subleito) <br> • Hidrológicos (Drenagem)")
        B2("2. Elaboração dos Projetos de Engenharia (Executivo) <br> • Projeto de Terraplenagem <br> • Projeto de OAEs <br> • Projeto de Pavimentação <br> • Componente Ambiental")
        B3[3. Orçamento e Plano de Execução da Obra]
        
        B1 --> B2 --> B3;
    end
    
    B --> C("FASE II: EXECUÇÃO DA OBRA <br> (CONSTRUÇÃO)");
    
    subgraph C
        C1("4. Serviços Preliminares e Instalação <br> • Licença de Instalação (LI) <br> • Instalação do Canteiro de Obras <br> • Locação Topográfica (Eixo, Off-sets) <br> • Limpeza e Remoção de Terra Vegetal")
        
        C1 --> C2[5. Execução da Infraestrutura];
        
        subgraph C2
            direction TB;
            
            subgraph Frente 1 - Terraplenagem
                C2_A[5a. Execução de Cortes]
                C2_B("5b. Execução de Aterros <br> (Compactação em camadas)")
                C2_C("5d. Drenagem e OACs <br> (Bueiros, Sarjetas, Valetas)")
                C2_A --> C2_B --> C2_C;
            end
            
            subgraph Frente 2 - Obras de Arte
                C2_D("5c. Execução de OAEs <br> (Pontes, Viadutos, Túneis)")
            end
            
        end
        
        %% --- INÍCIO DA CORREÇÃO ---
        %% Substituí a linha {C2_C, C2_D} --> C3(...) por duas linhas separadas
        C2_C --> C3("6. Execução da Superestrutura (Pavimentação) <br> • Execução da Sub-base <br> • Execução da Base <br> • Execução do Revestimento");
        C2_D --> C3;
        %% --- FIM DA CORREÇÃO ---
        
        C3 --> C4("7. Acabamentos e Obras Complementares <br> • Sinalização (Horizontal e Vertical) <br> • Dispositivos de Proteção (Defensas) <br> • Paisagismo e Recuperação Ambiental");
    end
    
    C --> D("FASE III: PÓS-CONSTRUÇÃO <br> (OPERAÇÃO)");
    
    subgraph D
        D1("8. Recebimento da Obra <br> (Termo de Recebimento Definitivo)")
        D2("9. Transição para Operação <br> (Campanha de informação)")
        D3("10. Início da Operação e Monitoramento <br> (Conservação e manutenção)")
        
        D1 --> D2 --> D3;
    end
    
    D --> E[FIM];
