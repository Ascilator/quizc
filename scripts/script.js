function goToNextStep(e) {
  const nodes = document.querySelectorAll('._step');
  const index = Array.prototype.indexOf.call(nodes, e.target.closest('._step'));

  document.querySelector('._track').style.transform = `translate(${-100 * (index + 1)}%, 0)`;
  document.querySelector('.quiz_container').style.height = getComputedStyle(
    document.querySelectorAll('._step')[index + 1]
  ).height;
}

let currentIndex = 0;
let lastQuestion = 0;

function goNextQuestion(index) {
  if (index === -1) {
    if (currentIndex === 0) return;

    document.querySelector('.question_track').style.transform = `translate(${
      -100 * (currentIndex - 1)
    }%, 0)`;
    currentIndex--;

    return;
  }

  // checkIsLast
  if (
    document.querySelector(`.question:nth-child(${currentIndex + 2})`).classList.contains('_last')
  ) {
    document.querySelector('.controls').classList.add('_active');
  }

  if (index === -2) {
    if (
      !document
        .querySelector(`.question:nth-child(${currentIndex + 1})`)
        .querySelector('input:checked')
    ) {
      return;
    }

    document.querySelector('.question_track').style.transform = `translate(${
      -100 * (currentIndex + 1)
    }%, 0)`;
    currentIndex++;

    return;
  }

  document.querySelector('.question_track').style.transform = `translate(${
    -100 * (index + 1)
  }%, 0)`;
  currentIndex++;
}

document
  .querySelectorAll('._next_step')
  .forEach((el, index) => el.addEventListener('click', e => goToNextStep(e, index)));

document.querySelectorAll('input[name="question1"]').forEach(e =>
  e.addEventListener('click', function (event) {
    document.querySelector('.rest_questions').classList.add(`_active_${event.target.value}`);
    goToNextStep(event, 0);
  })
);

document.querySelectorAll('.option input').forEach(e =>
  e.addEventListener('click', function (event) {
    const nodes = document.querySelectorAll('.question');
    if (!event.target.closest('._checkbox')) {
      const index = Array.prototype.indexOf.call(nodes, event.target.closest('.question'));
      goNextQuestion(index);
    }
  })
);

document.querySelector('.back_btn').addEventListener('click', function () {
  goNextQuestion(-1);
});

document.querySelector('.forward_btn').addEventListener('click', function () {
  goNextQuestion(-2);
});

// document.querySelector('form').addEventListener('submit', function (e) {
//   e.preventDefault();
//   console.log(e);
// });
