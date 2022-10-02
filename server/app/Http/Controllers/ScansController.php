<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ScanModel;

class ScansController extends Controller
{
    private $scans;

    public function _construct()
    {
        $this->scans = new ScanModel();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $scans = ScanModel::all();

        return response([
            'scans' => $scans,
            'message' => 'Retrieved successfully'
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $query = $this->scans->create([
            'qrData' => $request->data,
            'qrType' => $request->type
        ]);

        if ($query) {
            return response()->success('Data saved successfully');
        }
        else {
            return response()->failed('Data failed to save');
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        print($request);

        $query = ScanModel::create([
            'qrData' => $request->qrData,
            'qrType' => $request->qrType
        ]);

        if ($query) {
            return response([
                'status' => 200,
                'message' => 'Data saved successfully',
                'data' => $query . json_encode($request),
            ]);

        }
        else {
            return response([
                'status' => 500,
                'message' => 'Data failed to save',
                'data' => $query . json_encode($request),
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $scans = ScanModel::all();

        return response([
            'scans' => $scans,
            'message' => 'Retrieved successfully'
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $query = ScanModel::where('id', $id)->update([
            'qrData' => $request->qrData,
            'qrType' => $request->qrType
        ]);

        if ($query) {
            return response([
                'status' => 200,
                'message' => 'Data updated successfully',
                'data' => $query . json_encode($request),
            ]);
        }
        else {
            return response([
                'status' => 500,
                'message' => 'Data failed to update',
                'data' => $query . json_encode($request),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $query = $this->scan->where('id', $id)->update([
        //    'data' => $request->data,
        //    'type' => $request->type
        //]);

        $query = ScanModel::where('id', $id)->update([
            'qrData' => $request->qrData,
            'qrType' => $request->qrType
        ]);

        if ($query) {
            return response([
                'status' => 200,
                'message' => 'Data updated successfully',
                'data' => $query . json_encode($request),
            ]);
        }
        else {
            return response([
                'status' => 500,
                'message' => 'Data failed to update',
                'data' => $query . json_encode($request),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $query = $this->scan->where('id', $id)->delete();
        $query = ScanModel::where('id', $id)->delete();

        if ($query) {
            return response([
                'status' => 200,
                'message' => 'Data deleted successfully',
                'data' => $query,
            ]);
        }
        else {
            return response([
                'status' => 500,
                'message' => 'Data failed to delete',
                'data' => $query,
            ]);
        }
    }
}