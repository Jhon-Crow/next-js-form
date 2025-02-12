import {useState} from "react";
export const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [budgetFrom, setBudgetFrom] = useState('');
    const [budgetTo, setBudgetTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [reminds, setReminds] = useState('');
    const [rules, setRules] = useState({
        budget_from: '',
        budget_to: '',
        deadline_days: '',
        qty_freelancers: ''
    });
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${
            encodeURIComponent(token)}&title=${
            encodeURIComponent(title)}&description=${
            encodeURIComponent(description)}&tags=${
            encodeURIComponent(tags)}&budget_from=${
            encodeURIComponent(budgetFrom)}&budget_to=${
            encodeURIComponent(budgetTo)}&deadline=${
            encodeURIComponent(deadline)}&reminds=${
            encodeURIComponent(reminds)}&rules_budget_from=${
            encodeURIComponent(rules.budget_from)}&rules_budget_to=${
            encodeURIComponent(rules.budget_to)}&rules_deadline_days=${
            encodeURIComponent(rules.deadline_days)}&rules_qty_freelancers=${
            encodeURIComponent(rules.qty_freelancers)}`;
        const response = await fetch(url, {
            method: 'GET',
        });

        if (response.ok) {
            alert('Задача опубликована!');
        } else {
            alert('Ошибка при публикации задачи.');
        }
        setTitle('');
        setDescription('');
        setTags('');
        setBudgetFrom('');
        setBudgetTo('');
        setDeadline('');
        setReminds('');
        setRules({
            budget_from: '',
            budget_to: '',
            deadline_days: '',
            qty_freelancers: ''
        });
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="token">Токен</label>
                <input
                    type="text"
                    id="token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Введите токен"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                    required
                />
            </div>
            <h2 className="text-lg font-semibold mb-4">Создать задачу</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="title">Заголовок</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите заголовок"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">Описание</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Введите описание"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="tags">Теги</label>
                <input
                    required
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Введите теги (через запятую)"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="budget_from">Бюджет от</label>
                <input
                    required
                    type="number"
                    id="budget_from"
                    value={budgetFrom}
                    onChange={(e) => setBudgetFrom(e.target.value)}
                    placeholder="Бюджет от"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="budget_to">Бюджет до</label>
                <input
                    required
                    type="number"
                    id="budget_to"
                    value={budgetTo}
                    onChange={(e) => setBudgetTo(e.target.value)}
                    placeholder="Бюджет до"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="deadline">Дэдлайн</label>
                <input
                    required
                    type="number"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Дэдлайн"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="reminds">Напоминания</label>
                <input
                    type="number"
                    id="reminds"
                    value={reminds}
                    onChange={(e) => setReminds(e.target.value)}
                    placeholder="Напоминания"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>

            <h2 className="text-lg font-semibold mb-4">Правила</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rules_budget_from">Бюджет от</label>
                <input
                    required
                    type="number"
                    id="rules_budget_from"
                    value={rules.budget_from}
                    onChange={(e) => setRules({ ...rules, budget_from: e.target.value })}
                    placeholder="Бюджет от"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rules_budget_to">Бюджет до</label>
                <input
                    required
                    type="number"
                    id="rules_budget_to"
                    value={rules.budget_to}
                    onChange={(e) => setRules({ ...rules, budget_to: e.target.value })}
                    placeholder="Бюджет до"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rules_deadline_days">Срок выполнения (дни)</label>
                <input
                    required
                    type="number"
                    id="rules_deadline_days"
                    value={rules.deadline_days}
                    onChange={(e) => setRules({ ...rules, deadline_days: e.target.value })}
                    placeholder="Срок выполнения (дни)"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rules_qty_freelancers">Количество фрилансеров</label>
                <input
                    required
                    type="number"
                    id="rules_qty_freelancers"
                    value={rules.qty_freelancers}
                    onChange={(e) => setRules({ ...rules, qty_freelancers: e.target.value })}
                    placeholder="Количество фрилансеров"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
                >
                    Опубликовать задачу
                </button>
            </div>
        </form>
    );
};

