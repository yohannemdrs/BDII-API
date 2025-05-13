const btSalvar = document.getElementById("btSalvar");
const taskList = document.getElementById("taskList");

let todasAsTarefas = [];

btSalvar.addEventListener("click", criarTarefa);

async function criarTarefa() {
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const tipo = document.getElementById("tipo").value;

  if (!titulo || !descricao || !tipo) {
    alert("Preencha todos os campos!");
    return;
  }

  const novaTarefa = { titulo, descricao, tipo };

  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaTarefa),
  });

  if (response.ok) {
    limparFormulario();
    carregarTarefas();
  } else {
    alert("Erro ao salvar tarefa");
  }
}

function limparFormulario() {
  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("tipo").value = "";
}

async function carregarTarefas() {
  taskList.innerHTML = "";
  const response = await fetch("http://localhost:3000/tasks");
  todasAsTarefas = await response.json();
  exibirTarefas(todasAsTarefas);
}

function exibirTarefas(tarefas) {
  taskList.innerHTML = "";

  tarefas.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-title">${task.titulo}</div>
      <div class="task-descricao">${task.descricao}</div>
      <div class="task-data">${new Date(task.dataHora).toLocaleString()}</div>
      <div class="task-tipo">${task.tipo}</div>
      <div class="task-actions">
        <button onclick="editarTarefa('${task.id}', \`${task.titulo}\`, \`${task.descricao}\`, '${task.tipo}')">
          <i data-lucide="pencil"></i>
        </button>
        <button onclick="excluirTarefa('${task.id}')">
          <i data-lucide="x"></i>
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  lucide.createIcons();
}

function editarTarefa(id, tituloAntigo, descricaoAntiga, tipoAntigo) {
  const li = [...taskList.children].find(item =>
    item.innerHTML.includes(`excluirTarefa('${id}')`)
  );

  if (!li) return;

  li.innerHTML = `
    <input type="text" value="${tituloAntigo}" id="edit-titulo-${id}" class="form-edit">
    <textarea id="edit-descricao-${id}" class="form-edit">${descricaoAntiga}</textarea>
    <select id="edit-tipo-${id}" class="form-edit">
      <option value="Pessoal" ${tipoAntigo === "Pessoal" ? "selected" : ""}>Pessoal</option>
      <option value="Profissional" ${tipoAntigo === "Profissional" ? "selected" : ""}>Profissional</option>
    </select>
    <div class="task-actions">
      <button onclick="salvarEdicao('${id}')">
        <i data-lucide="check"></i>
      </button>
      <button onclick="carregarTarefas()">
        <i data-lucide="x"></i>
      </button>
    </div>
  `;

  lucide.createIcons();
}

function salvarEdicao(id) {
  const titulo = document.getElementById(`edit-titulo-${id}`).value.trim();
  const descricao = document.getElementById(`edit-descricao-${id}`).value.trim();
  const tipo = document.getElementById(`edit-tipo-${id}`).value;

  if (!titulo || !descricao || !tipo) {
    alert("Todos os campos devem ser preenchidos!");
    return;
  }

  fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descricao, tipo }),
  }).then(response => {
    if (response.ok) {
      carregarTarefas();
    } else {
      alert("Erro ao atualizar tarefa");
    }
  });
}

async function excluirTarefa(id) {
  if (!confirm("Deseja excluir essa tarefa?")) return;

  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    carregarTarefas();
  } else {
    alert("Erro ao excluir tarefa");
  }
}

function filtrarTarefas(tipo) {
  if (tipo === "Todas") {
    exibirTarefas(todasAsTarefas);
  } else {
    const filtradas = todasAsTarefas.filter(task => task.tipo === tipo);
    exibirTarefas(filtradas);
  }
}

carregarTarefas();