export async function calculateStadistics(question) {
  const diccionario = {};
  if (!question.listvoters) return diccionario;
  question.listvoters.map((x) => {
    if (diccionario.hasOwnProperty(x.option)) diccionario[x.option] += 1;
  });

  return diccionario;
}
