$(document).ready(function() {
    var tarefas = [];

    function carregarTarefasDoLocalStorage() {
        if (localStorage.getItem("tarefas")) {
            tarefas = JSON.parse(localStorage.getItem("tarefas"));
            atualizarListaTarefas();
        }
    }

    function salvarTarefasNoLocalStorage() {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function adicionarTarefa(descricao) {
        var id = Math.floor(Math.random() * 1000000);

        var tarefa = {
            id: id,
            descricao: descricao,
            concluida: false
        };

        tarefas.push(tarefa);
        salvarTarefasNoLocalStorage();
        atualizarListaTarefas();
    }

    function atualizarListaTarefas() {
        $("#lista-tarefas").empty();

        var filtro = $(".filtro-ativo").attr("id").replace("botao-filtro-", "");
        var tarefasFiltradas = tarefas.filter(function(tarefa) {
            if (filtro === "todas") return true;
            else if (filtro === "pendentes") return !tarefa.concluida;
            else if (filtro === "feitas") return tarefa.concluida;
        });

        tarefasFiltradas.forEach(function(tarefa) {
            var li = $("<li>").attr("id", tarefa.id);
            li.addClass("tarefa");

            if (tarefa.concluida) {
                li.addClass("concluida");
            }

            var checkbox = $("<input type='checkbox'>").prop("checked", tarefa.concluida);
            checkbox.change(function() {
                toggleTarefaConcluida(tarefa.id);
                atualizarListaTarefas();
            });

            var descricao = $("<span>").text(tarefa.descricao);
            descricao.click(function() {
                toggleTarefaConcluida(tarefa.id);
            });

            li.append(checkbox, descricao);
            $("#lista-tarefas").append(li);
        });
    }

    function toggleTarefaConcluida(idTarefa) {
        var indiceTarefa = tarefas.findIndex(function(tarefa) {
            return tarefa.id === idTarefa;
        });

        if (indiceTarefa !== -1) {
            tarefas[indiceTarefa].concluida = !tarefas[indiceTarefa].concluida;
            salvarTarefasNoLocalStorage();
            atualizarListaTarefas();
        }
    }

    $(".filtros button").click(function() {
        $(".filtros button").removeClass("filtro-ativo");
        $(this).addClass("filtro-ativo");
        atualizarListaTarefas();
    });

    carregarTarefasDoLocalStorage();
});
