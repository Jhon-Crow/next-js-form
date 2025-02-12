import {useState} from "react";
import {z} from 'zod';



export const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [budgetFrom, setBudgetFrom] = useState('');
    const [budgetTo, setBudgetTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [reminds, setReminds] = useState('');
    const [rulesBudgetFrom, setRulesBudgetFrom] = useState('');
    const [rulesBudgetTo, setRulesBudgetTo] = useState('');
    const [rulesDeadlineDays, setRulesDeadlineDays] = useState('');
    const [rulesQtyFreelancers, setRulesQtyFreelancers] = useState('');
    const [token, setToken] = useState('');
    const [allAutoResponses, setAllAutoResponses] = useState(false);

    const [errors, setErrors] = useState({});

    const schema = z.object({
        token: z.string().min(1, "Токен обязателен"),
        title: z.string().min(1, "Заголовок обязателен"),
        description: z.string().min(1, "Описание обязательно"),
        tags: z.string().optional(),
        budgetFrom: z.number().min(1, "Бюджет от должен быть больше 0"),
        budgetTo: z.number().min(budgetFrom, "Бюджет до должен быть " + budgetFrom + ' и больше'),
        deadline: z.number().min(1, "Дэдлайн должен быть больше 0"),
        reminds: z.number().min(1, "Количество напоминаний должно быть больше 0").optional(),
        rules_budget_from: z.number().min(1, "Бюджет от должен быть больше 0"),
        rules_budget_to: z.number().min(rulesBudgetFrom, "Бюджет до должен быть " + rulesBudgetFrom + ' и больше'),
        rules_deadline_days: z.number().min(1, "Срок выполнения должен быть больше 0"),
        rules_qty_freelancers: z.number().min(1, "Количество фрилансеров должно быть больше 0"),
        all_auto_responses: z.boolean(),
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedData = {
            token,
            title,
            description,
            tags,
            budgetFrom: Number(budgetFrom),
            budgetTo: Number(budgetTo),
            deadline: Number(deadline),
            reminds: Number(reminds),
            rules_budget_from: Number(rulesBudgetFrom),
            rules_budget_to: Number(rulesBudgetTo),
            rules_deadline_days: Number(rulesDeadlineDays),
            rules_qty_freelancers: Number(rulesQtyFreelancers),
            all_auto_responses: allAutoResponses,
        };

        // /newhardtask?token=317ad1fc-e0a9-11ef-a978-0242ac120007&title=%D0%A1%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C%20%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%20%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%B0&description=%D0%A1%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C%20%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%20%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D1%87%D0%BA%D0%B8%20%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%B0%20%D1%81%20%D0%BD%D0%B0%D1%88%D0%B8%D0%BC%D0%B8%20%D1%84%D0%BE%D1%82%D0%BE%20%D0%B4%D0%BB%D1%8F%20%D0%B2%D0%B1&tags=%D0%B2%D0%B1%2C%20%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%2C%20%D1%84%D0%B8%D0%B3%D0%BC%D0%B0&budget_from=1000&budget_to=5000&deadline=1&reminds=3&all_auto_responses=false&rules=%7B%22budget_from%22%3A5000%2C%22budget_to%22%3A8000%2C%22deadline_days%22%3A5%2C%22qty_freelancers%22%3A1%7D

        try {
            schema.parse(parsedData);
            const url = `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${
                encodeURIComponent(token)}&title=${
                encodeURIComponent(title)}&description=${
                encodeURIComponent(description)}&tags=${
                encodeURIComponent(tags)}&budget_from=${
                encodeURIComponent(budgetFrom)}&budget_to=${
                encodeURIComponent(budgetTo)}&deadline=${
                encodeURIComponent(deadline)}&reminds=${
                encodeURIComponent(reminds)}&all_auto_responses=${
                encodeURIComponent(allAutoResponses)}&rules_budget_from=${
                encodeURIComponent(rulesBudgetFrom)}&rules_budget_to=${
                encodeURIComponent(rulesBudgetTo)}&rules_deadline_days=${
                encodeURIComponent(rulesDeadlineDays)}&rules_qty_freelancers=${
                encodeURIComponent(rulesQtyFreelancers)}`;
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
            setRulesBudgetFrom('');
            setRulesBudgetTo('');
            setRulesDeadlineDays('');
            setRulesQtyFreelancers('');
            setAllAutoResponses(false);
            setErrors({});
        } catch (err) {
            setErrors(err.formErrors.fieldErrors);
        }
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
                {errors.token && <p className="text-red-500">{errors.token}</p>}
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
                {errors.title && <p className="text-red-500">{errors.title}</p>}
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
                {errors.description && <p className="text-red-500">{errors.description}</p>}
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
                {errors.tags && <p className="text-red-500">{errors.tags}</p>}
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
                {errors.budgetFrom && <p className="text-red-500">{errors.budgetFrom}</p>}
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
                {errors.budgetTo && <p className="text-red-500">{errors.budgetTo}</p>}
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
                {errors.deadline && <p className="text-red-500">{errors.deadline}</p>}
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
                {errors.reminds && <p className="text-red-500">{errors.reminds}</p>}
            </div>

            <h2 className="text-lg font-semibold mb-4">Правила</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rules_budget_from">Бюджет от</label>
                <input
                    required
                    type="number"
                    id="rules_budget_from"
                    value={rulesBudgetFrom}
                    onChange={(e) => setRulesBudgetFrom(e.target.value)}
                    placeholder="Бюджет от"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
                {errors.rules_budget_from && <p className="text-red-500">{errors.rules_budget_from}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rules_budget_to">Бюджет до</label>
                <input
                    required
                    type="number"
                    id="rules_budget_to"
                    value={rulesBudgetTo}
                    onChange={(e) => setRulesBudgetTo(e.target.value)}
                    placeholder="Бюджет до"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
                {errors.rules_budget_to && <p className="text-red-500">{errors.rules_budget_to}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rules_deadline_days">Срок выполнения (дни)</label>
                <input
                    required
                    type="number"
                    id="rules_deadline_days"
                    value={rulesDeadlineDays}
                    onChange={(e) => setRulesDeadlineDays(e.target.value)}
                    placeholder="Срок выполнения (дни)"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
                {errors.rules_deadline_days && <p className="text-red-500">{errors.rules_deadline_days}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rules_qty_freelancers">Количество фрилансеров</label>
                <input
                    required
                    type="number"
                    id="rules_qty_freelancers"
                    value={rulesQtyFreelancers}
                    onChange={(e) => setRulesQtyFreelancers(e.target.value)}
                    placeholder="Количество фрилансеров"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-500"
                />
                {errors.rules_qty_freelancers && <p className="text-red-500">{errors.rules_qty_freelancers}</p>}
            </div>
            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={allAutoResponses}
                        onChange={(e) => setAllAutoResponses(e.target.checked)} // Обработчик изменения состояния
                        className="mr-2"
                    />
                    Включить автоматические ответы
                </label>
                {errors.all_auto_responses && <p className="text-red-500">{errors.all_auto_responses}</p>}
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

