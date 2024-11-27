<script>
    import {onMount} from 'svelte';
    import AddRequestPopup from './add-request.svelte';

    let requests = [
        {id: 1, requestName: 'duyet danh muc'},
        {id: 2, requestName: 'duyet chuong trinh'},
    ];
    let showPopup = false;
    let users = [
        {id: 1, username: 'Xuankhai'},
        {id: 3, username: 'Nhan vien A'},
        {id: 5, username: 'Quan ly A'},
    ];
    let selectedUser = {
        id: null,
        username: '',
    };

    async function navigateToStepPage() {
        // Chuyển đến trang Step và truyền dữ liệu users qua URL
        const encodedUsers = encodeURIComponent(JSON.stringify(users));
        window.location.href = `/step?users=${encodedUsers}`;
    }

    function handleUserClick(user) {
        selectedUser = {
            id: user.id,
            username: user.username,
        };
        console.log('Selected User:', selectedUser); // Log ra giá trị
    }

    // Lấy danh sách yêu cầu từ API
    onMount(async () => {
        // const response = await fetch('/request/api'); // Thay bằng endpoint thực tế
        // requests = await response.json();
    });

    // Hàm xử lý Accept hoặc Reject yêu cầu
    async function handleAction(requestId, action) {
        const data = {
            actorId: selectedUser.id,
            requestId: requestId,
            status: action
        }

        console.log(data);
        const response = await fetch(`http://localhost:3000/step/action`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data}),
        });

        // @ts-ignore
        if (response.status == 200) {
                const result = await response.json();
                alert('Steps submitted successfully!');
                console.log(result);
            } else {
                alert('Failed to submit steps.');
            }
        // Cập nhật lại danh sách yêu cầu sau khi action
        onMount();
    }

    function openPopup() {
        showPopup = true;
    }

    function closePopup() {
        showPopup = false;
    }
</script>
<div>
    {#each users as user}
        <button on:click={() => handleUserClick(user)}>{user.username}</button>
    {/each}
</div>
{#if selectedUser.id}
    <h2>Selected User:</h2>
    <p>Username: {selectedUser.username}</p>
    <p>UserID: {selectedUser.id}</p>
{/if}
<h1>Request Management</h1>
<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    {#each requests as request (request.id)}
        <tr>
            <td>{request.requestName}</td>
            <td>
                <button on:click={() => handleAction(request.id, 'accept')}>Accept</button>
                <button on:click={() => handleAction(request.id, 'reject')}>Reject</button>
            </td>
        </tr>
    {/each}
    </tbody>
</table>

<button on:click={openPopup}>Add Request</button>

{#if showPopup}
    <AddRequestPopup {closePopup}/>
{/if}

<button on:click={navigateToStepPage}>Go to Step Page</button>

